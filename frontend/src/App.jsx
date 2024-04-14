import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import  PrivateRoute from './context/PrivateRoute';
import SubscriptionCheck from './context/SubscriptionCheck';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashBoard from './pages/DashBoard';
import Error from './pages/404';
import PricePage from './pages/pricePage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';


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
                <Route path = "/dashboard" element={<PrivateRoute> {<SubscriptionCheck><DashBoard /> </SubscriptionCheck>}</PrivateRoute>} />
                <Route path ="/pricing" element={<PrivateRoute><PricePage/> </PrivateRoute>} />
                <Route path ="/success" element={<PrivateRoute><SuccessPage/> </PrivateRoute>} />
                <Route path ="/cancelled" element={<PrivateRoute><CancelPage/> </PrivateRoute>} />
              </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
