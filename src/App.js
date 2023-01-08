import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main/main.js';
import { Login } from './pages/login';
import { CreatePost } from './pages/create-post/createPost';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
