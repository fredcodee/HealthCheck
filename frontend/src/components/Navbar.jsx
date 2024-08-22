import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [token, setToken] =useState(null)
    const accountType = localStorage.getItem('AccountType').replace(/"/g, '') || false

    useEffect(()=>{
        setToken(localStorage.getItem('token'))
    },[])



    const handleLogout = async()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('AccountType');
        localStorage.removeItem('FreeTrail');
        localStorage.removeItem('subscription_Mode');
        localStorage.removeItem('type');
        window.location.reload()
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn" data-wow-delay="0.1s">
                <a href="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <h1 className="m-0 text-primary"><i className="far fa-hospital me-3"></i>HealthCheck</h1>
                </a>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                        {
                            token ?( 
                            <div className="navbar-nav ms-auto p-4 p-lg-0">
                                <a href="/dashboard" className="nav-item nav-link">Dashboard</a>
                                <a href="/appointments/status" className="nav-item nav-link">My Appointments</a>
                                <a href="/profile" className="nav-item nav-link">My Profile</a>
                                <a href="https://thefredcode.com/" className="nav-item nav-link">Contact</a>
                                <a href="#" className="nav-item nav-link" onClick={handleLogout}>Logout</a>
                            </div>
                            ):
                            <div className="navbar-nav ms-auto p-4 p-lg-0">
                                <a href="/" className="nav-item nav-link active">Home</a>
                                <a href="about.html" className="nav-item nav-link">About</a>
                                <a href="/pricing" className="nav-item nav-link">Pricing</a>
                                <a href="service.html" className="nav-item nav-link">Service</a>
                                <a href="testimonial.html" className="nav-item nav-link">Testimonial</a>
                                <a href="contact.html" className="nav-item nav-link">Contact</a>
                                <a href="/login" className="nav-item nav-link">Login</a>
                            </div>
                            
                        }

                    
                    {accountType == 'Patient' && accountType && 
                    <a href="/appointment" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Book Appointment<i className="fa fa-arrow-right ms-3"></i></a>
                    }
                        
                    </div>
            </nav>
        </div>
    )
}

export default Navbar