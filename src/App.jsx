import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Document from './pages/Document';

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/Document' element={<Document/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
