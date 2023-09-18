import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TaskList from './components/TaskList/taskList';
import Login from './components/Auth/Login';
function App() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<TaskList />} />

      </Routes>
    </Router>
  );
}

export default App;
