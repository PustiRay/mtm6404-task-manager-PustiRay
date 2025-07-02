const TaskItem = ({ task, children }) => (
  <li className="task-item">
    <span>{task}</span>
    <div className="task-buttons">
      {children}
    </div>
  </li>
);

export default TaskItem;
