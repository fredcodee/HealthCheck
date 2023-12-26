import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashBoard from './pages/DashBoard';
import Error from './pages/404';


function App() {

  return (
    <>
    <Navbar />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/error" element={<Error />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
