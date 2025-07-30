import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onComplete, onDelete, showCompleted }) => {
  const visibleTasks = tasks.filter((task) => showCompleted || !task.completed);

  return visibleTasks.length > 0 ? (
    <ul className="task-list">
      {visibleTasks.map((taskObj, index) => {
        let priorityClass = "";
        if (taskObj.priority === "High") priorityClass = "high-priority";
        else if (taskObj.priority === "Medium") priorityClass = "medium-priority";
        else if (taskObj.priority === "Low") priorityClass = "low-priority";

        return (
          <li key={index} className={`task-item ${priorityClass}`}>
            <span>{taskObj.task}</span>
            <div className="task-buttons">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span><strong>Priority:</strong> {taskObj.priority}</span>
                <span><strong>Status:</strong> {taskObj.completed ? "✅ Completed" : "❌ Incomplete"}</span>
              </div>
              <button onClick={() => onComplete(index)}>
                {taskObj.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => onDelete(index)}>Remove</button>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <p style={{ textAlign: "center" }}>No tasks to display.</p>
  );
};

export default TaskList;
