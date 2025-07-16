import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onDelete, showCompleted }) => {
  // Filter out completed tasks if user unchecked "Show Completed"
  const visibleTasks = tasks.filter(task => showCompleted || !task.completed);

  return visibleTasks.length > 0 ? (
    <ul className="task-list">
      {visibleTasks.map((taskObj, index) => (
        <TaskItem key={index} task={taskObj.task}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span><strong>Priority:</strong> {taskObj.priority}</span>
            <span><strong>Status:</strong> {taskObj.completed ? '✅ Completed' : '❌ Incomplete'}</span>
          </div>
          <button onClick={() => onComplete(index)}>
            {taskObj.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => onDelete(index)}>Remove</button>
        </TaskItem>
      ))}
    </ul>
  ) : (
    <p style={{ textAlign: 'center' }}>No tasks to display.</p>
  );
};

export default TaskList;
