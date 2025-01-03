import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import  PrivateRoute from './context/PrivateRoute';
import SubscriptionCheck from './context/SubscriptionCheck';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashBoard from './pages/DashBoard';
import Error from './pages/404';
import Pricing from './pages/Pricing';
import PricePage from './pages/pricePage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import AppointmentPage from './pages/AppointmentPage';
import ProfilePage from './pages/ProfilePage';
import CreateSchedule from './pages/CreateSchedule';
import DoctorPageAppointment from './pages/DoctorPageAppointment';
import AppointmentStatusPage from './pages/AppointmentStatusPage';
import AppointmentDetails from './pages/AppointmentDetails';
import ReviewsPage from './pages/ReviewsPage';
import DoctorReviewsPage from './pages/DoctorReviewsPage';
import UpcomingAppointments from './pages/UpcomingAppointments';

function App() {

  return (
    <>
    
      <BrowserRouter>
        <AuthProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/prices" element={<Pricing />} />
                <Route path="/error" element={<Error />} /> 
                <Route path = "/dashboard" element={<PrivateRoute> {<SubscriptionCheck><DashBoard /> </SubscriptionCheck>}</PrivateRoute>} />
                <Route path ="/pricing" element={<PrivateRoute><PricePage/> </PrivateRoute>} />
                <Route path ="/success" element={<PrivateRoute><SuccessPage/> </PrivateRoute>} />
                <Route path ="/cancelled" element={<PrivateRoute><CancelPage/> </PrivateRoute>} />
                <Route path ="/appointment" element={<PrivateRoute>{<SubscriptionCheck> <AppointmentPage/> </SubscriptionCheck>} </PrivateRoute>} />
                <Route path ="/profile" element={<PrivateRoute>{<SubscriptionCheck> <ProfilePage/> </SubscriptionCheck>} </PrivateRoute>} />
                <Route path ="/create-schedule" element={<PrivateRoute>{<SubscriptionCheck> <CreateSchedule/> </SubscriptionCheck>} </PrivateRoute>} />
                <Route path ="/doctor-appointment/:id" element={<PrivateRoute>{<SubscriptionCheck> <DoctorPageAppointment/> </SubscriptionCheck>} </PrivateRoute>} />
                <Route path ="/appointments/status" element={<PrivateRoute>{<SubscriptionCheck> <AppointmentStatusPage/> </SubscriptionCheck>} </PrivateRoute>} />
                <Route path ="/appointment-details/:id" element={<PrivateRoute>{<SubscriptionCheck> <AppointmentDetails/> </SubscriptionCheck>} </PrivateRoute>} />
                <Route path ="/reviews" element={<PrivateRoute>{<SubscriptionCheck> <ReviewsPage/> </SubscriptionCheck>} </PrivateRoute>} />
                <Route path ="/doctor-reviews/:id" element={<PrivateRoute>{<SubscriptionCheck> <DoctorReviewsPage/> </SubscriptionCheck>} </PrivateRoute>} />
                <Route path ="/upcoming-appointments" element={<PrivateRoute>{<SubscriptionCheck> <UpcomingAppointments/> </SubscriptionCheck>} </PrivateRoute>} />
               </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
