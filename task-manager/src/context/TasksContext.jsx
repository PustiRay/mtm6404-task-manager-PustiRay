// src/context/TaskContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [lists, setLists] = useState({});
  const listsCollectionRef = collection(db, "taskLists");

  // Real-time listener for lists collection
  useEffect(() => {
    const unsubscribe = onSnapshot(
      listsCollectionRef,
      (snapshot) => {
        const fetchedLists = {};
        snapshot.forEach((docSnap) => {
          fetchedLists[docSnap.id] = docSnap.data().tasks || [];
        });
        setLists(fetchedLists);
      },
      (error) => {
        console.error("Error fetching lists:", error);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Save or update a list in Firestore
  const saveListToFirestore = async (listName, tasks) => {
    try {
      await setDoc(doc(db, "taskLists", listName), { tasks });
      console.log(`List '${listName}' saved successfully.`);
    } catch (error) {
      console.error(`Error saving list '${listName}':`, error);
    }
  };

  // Delete a list from Firestore
  const deleteListFromFirestore = async (listName) => {
    try {
      await deleteDoc(doc(db, "taskLists", listName));
      console.log(`List '${listName}' deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting list '${listName}':`, error);
    }
  };

  // Add a new list
  const addList = (listName) => {
    if (!lists[listName]) {
      const updatedLists = { ...lists, [listName]: [] };
      setLists(updatedLists); // update local state immediately
      saveListToFirestore(listName, []);
    }
  };

  // Delete a list
  const deleteList = (listName) => {
    const updatedLists = { ...lists };
    delete updatedLists[listName];
    setLists(updatedLists);
    deleteListFromFirestore(listName);
  };

  // Update tasks in a specific list
  const updateTasksInList = (listName, updatedTasks) => {
    const updatedLists = { ...lists, [listName]: updatedTasks };
    setLists(updatedLists); // update local state immediately
    saveListToFirestore(listName, updatedTasks);
  };

  return (
    <TasksContext.Provider
      value={{ lists, setLists, addList, deleteList, updateTasksInList }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// Custom hook to use the TasksContext easily
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
