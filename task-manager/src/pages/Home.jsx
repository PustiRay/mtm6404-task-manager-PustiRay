// src/pages/Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

const Home = () => {
  const { lists, addList, deleteList } = useTasks();
  const [listName, setListName] = useState("");

  const handleCreateList = () => {
    const trimmedName = listName.trim();
    if (trimmedName && !lists[trimmedName]) {
      addList(trimmedName);
      setListName("");
    }
  };

  // Count incomplete tasks in a list
  const countIncomplete = (tasks) =>
    tasks.filter((task) => !task.completed).length;

  // Choose border color by tasks left
  const borderColorByCount = (count) => {
    if (count === 0) return "#2ecc71"; // green
    if (count <= 3) return "#f1c40f"; // yellow
    return "#e74c3c"; // red
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>📁 All Lists</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <label
          htmlFor="new-list"
          style={{
            fontWeight: "600",
            fontSize: "1rem",
            marginRight: 8,
            userSelect: "none",
          }}
        >
          New list name
        </label>
        <input
          id="new-list"
          type="text"
          placeholder="New list name..."
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: 8,
            border: "1px solid #ccc",
            flexGrow: 1,
            minWidth: 200,
            fontSize: "1rem",
          }}
        />
        <button
          onClick={handleCreateList}
          style={{
            backgroundColor: "#89A8B2",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#6e8590")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#89A8B2")}
        >
          Add List
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {Object.keys(lists).length === 0 && (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            No lists yet. Start by adding a new list above!
          </p>
        )}

        {Object.entries(lists).map(([name, tasks]) => {
          const tasksLeft = countIncomplete(tasks);
          return (
            <div
              key={name}
              style={{
                backgroundColor: "#E5E1DA",
                padding: "1rem 1.25rem",
                borderRadius: 12,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: `4px solid ${borderColorByCount(tasksLeft)}`,
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <Link
                to={`/list/${encodeURIComponent(name)}`}
                style={{
                  textDecoration: "none",
                  color: "#213555",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                  wordBreak: "break-word",
                }}
              >
                {name}
              </Link>

              <p
                style={{
                  margin: 0,
                  fontWeight: "600",
                  fontSize: "1rem",
                  color: tasksLeft === 0 ? "#2ecc71" : "#e74c3c",
                }}
              >
                Tasks to finish: {tasksLeft}
              </p>

              {tasksLeft === 0 && (
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#2ecc71",
                    marginTop: "0.5rem",
                    fontStyle: "italic",
                  }}
                >
                  All done! 🎉
                </p>
              )}

              <button
                onClick={() => deleteList(name)}
                style={{
                  backgroundColor: "#B3C8CF",
                  color: "#213555",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  opacity: 0.9,
                  transition: "all 0.2s ease",
                  marginTop: "0.75rem",
                  alignSelf: "flex-start",
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
