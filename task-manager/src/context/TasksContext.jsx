import { createContext, useContext, useState, useEffect } from "react";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  // Load from localStorage or start with an empty object: { listName: [tasks] }
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("taskLists");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(lists));
  }, [lists]);

  return (
    <TasksContext.Provider value={{ lists, setLists }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
