import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css'; // optional styling

function TaskList() {
  const tasks = [
    'Complete iteration 1',
    'Review design mockups',
    'Set up GitHub repo',
    'Create README.md',
    'Add professor as collaborator',
  ];

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map((task, idx) => (
          <TaskItem key={idx} task={task} />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
