import { useParams, Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import { useState } from "react";

const ListPage = () => {
  const { listName } = useParams();
  const { lists, setLists } = useTasks();
  const tasks = lists[listName] || [];

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [showCompleted, setShowCompleted] = useState(true);

  const saveTasks = (updatedTasks) => {
    setLists({ ...lists, [listName]: updatedTasks });
  };

  const handleAdd = () => {
    if (input.trim()) {
      const newTask = {
        task: input.trim(),
        priority,
        completed: false,
      };

      const updatedTasks = [...tasks, newTask].sort((a, b) => {
        const priorities = { High: 1, Medium: 2, Low: 3 };
        return priorities[a.priority] - priorities[b.priority];
      });

      saveTasks(updatedTasks);
      setInput("");
      setPriority("Medium");
    }
  };

  const handleComplete = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updated);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    saveTasks(updated);
  };

  return (
    <>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "1rem",
          color: "#89A8B2",
          fontWeight: "bold",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        ← Back to All Lists
      </Link>

      <h2>List: {listName}</h2>

      <AddTaskForm
        input={input}
        setInput={setInput}
        priority={priority}
        setPriority={setPriority}
        onAdd={handleAdd}
      />

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show Completed Tasks
        </label>
      </div>

      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
        showCompleted={showCompleted}
      />
    </>
  );
};

export default ListPage;
