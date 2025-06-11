import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <Home />
        <TaskList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
