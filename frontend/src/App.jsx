import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import  PrivateRoute from './context/PrivateRoute';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashBoard from './pages/DashBoard';
import Error from './pages/404';
import PricePage from './pages/pricePage';


function App() {

  return (
    <>
    <Navbar />
      <BrowserRouter>
        <AuthProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/error" element={<Error />} /> 
                <Route path = "/dashBoard" element={<PrivateRoute> <DashBoard /> </PrivateRoute>} />
                <Route path ="/pricing" element={<PrivateRoute><PricePage/> </PrivateRoute>} />
              </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
