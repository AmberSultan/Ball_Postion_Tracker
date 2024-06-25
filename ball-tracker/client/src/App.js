import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import './App.css';

const App = () => {
    const [token, setToken] = useState(false); 

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/register" />} />  
            </Routes>
        </Router>
    );
};

export default App;

