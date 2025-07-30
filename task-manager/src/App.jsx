import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import { TasksProvider } from './context/TasksContext';

function App() {
  return (
    <TasksProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list/:listName" element={<ListPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </TasksProvider>
  );
}

export default App;
