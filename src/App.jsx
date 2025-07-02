import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    'Buy Sofa',
    'Order Curtains',
    'Get Kitchen Essentials',
    'Purchase Lamps',
    'Setup Internet'
  ]);

  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h2>🛒 New Home Essentials</h2>
      <AddTaskForm
        input={input}
        setInput={setInput}
        onAdd={handleAdd}
      />
      <TaskList tasks={tasks} />
      <Footer />
    </div>
  );
}

export default App;
