import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  return tasks.length > 0 ? (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task}>
          <button>Edit</button>
          <button>Complete</button>
          <button>Remove</button>
        </TaskItem>
      ))}
    </ul>
  ) : (
    <p>No tasks yet. Start by adding one above!</p>
  );
};

export default TaskList;
