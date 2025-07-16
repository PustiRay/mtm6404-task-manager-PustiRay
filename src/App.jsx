import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [showCompleted, setShowCompleted] = useState(true);

  // Load tasks from localStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  const handleAdd = () => {
    if (input.trim()) {
      const newTask = {
        task: input,
        priority,
        completed: false,
      };

      const updatedTasks = [...tasks, newTask].sort((a, b) => {
        const priorities = { High: 1, Medium: 2, Low: 3 };
        return priorities[a.priority] - priorities[b.priority];
      });

      setTasks(updatedTasks);
      setInput('');
      setPriority('Medium');
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const handleComplete = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <Navbar />
      <h2>🛒 New Home Essentials</h2>

      <AddTaskForm
        input={input}
        setInput={setInput}
        priority={priority}
        setPriority={setPriority}
        onAdd={handleAdd}
      />

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
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

      <Footer />
    </div>
  );
}

export default App;
