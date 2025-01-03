import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Navbar = () => {
    const [token, setToken] = useState(null)
    const { logoutUser} = useContext(AuthContext)

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [ token ])

    const handleLogout = async () => {
        await logoutUser();
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn">
                <a href="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <h1 className="m-0 text-primary"><i className="far fa-hospital me-3"></i>HealthCheck</h1>
                </a>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse" id="navbarCollapse">
                    {
                        token ? (
                            <div className="navbar-nav ms-auto p-4 p-lg-0">
                                <a href="/dashboard" className="nav-item nav-link">Dashboard</a>
                                <a href="/appointments/status" className="nav-item nav-link">My Appointments</a>
                                <a href="/profile" className="nav-item nav-link">My Profile</a>
                                <a href="https://thefredcode.com/" className="nav-item nav-link">Contact</a>
                                <a href="#" className="nav-item nav-link" onClick={handleLogout}>Logout</a>
                            </div>
                        ) :
                            <div className="navbar-nav ms-auto p-4 p-lg-0">
                                <a href="/" className="nav-item nav-link active">Home</a>
                                <a href="#about" className="nav-item nav-link">About</a>
                                <a href="/prices" className="nav-item nav-link">Pricing</a>
                                <a href="#service" className="nav-item nav-link">Service</a>
                                <a href="#testimonial" className="nav-item nav-link">Testimonial</a>
                                <a href="https://thefredcode.com/" className="nav-item nav-link">Contact</a>
                                <a href="/login" className="nav-item nav-link">Login</a>
                            </div>

                    }


                    <a href="/appointment" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Book Appointment<i className="fa fa-arrow-right ms-3"></i></a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar