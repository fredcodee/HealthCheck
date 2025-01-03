import React from 'react'
import Navbar from '../components/Navbar'
import '../assets/styles/css/pricePage.css'
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
    const navigate = useNavigate()

    const handleSubscription = () => {
        navigate('/login')
    }
    return (
        <div>
            <Navbar />
            <section className="pricing">
                <h1>Plans Made Simple</h1>
                <div className="pricing-plans">
                    <h1>Plans For Patients</h1>
                    <div className="plans-container">
                        <div className="plan">
                            <div className="offer">
                                <h2>Free</h2>
                                <div>
                                    <span className="price">$0</span>
                                    <span className="period">/mo</span>
                                </div>
                                <p>Up to <strong>3</strong> Appointments</p>
                            </div>
                            <ul>
                                <li>Access to all features</li>
                                <li>Email & chat support</li>

                            </ul>
                            <button id="checkout-and-portal-button" type="submit" className='btn btn-primary' onClick={() => handleSubscription()}>
                                free trial
                            </button>
                        </div>
                        <div className="plan">
                            <div className="offer pt-4">
                                <h2>Monthly</h2>
                                <div>
                                    <span className="price">$3</span>
                                    <span className="period">/mo</span>
                                </div>
                                <p><strong>Unlimited</strong> Appointments</p>
                            </div>
                            <ul>
                                <li>Access to all features</li>
                                <li>Find Doctors in your area</li>
                                <li>One-click Appointment Booking</li>
                                <li>Email & chat support</li>
                                <li>
                                    Launch discount <s>$49/mo</s>
                                </li>
                            </ul>
                            <button id="checkout-and-portal-button" type="submit" className='btn btn-primary mb-4' onClick={() => handleSubscription()}>
                                Subscribe
                            </button>

                        </div>
                        <div className="plan">
                            <div className="offer pt-4">
                                <h2>Yearly</h2>
                                <div>
                                    <span className="price">$30</span>
                                    <span className="period">/year</span>
                                </div>
                                <p>Discount<strong> 10%</strong> off</p>
                            </div>
                            <ul>
                                <li>Access to all features</li>
                                <li>Find Doctors in your area</li>
                                <li>One-click Appointment Booking</li>
                                <li>Email & chat support</li>
                                <li>Launch discount</li>
                            </ul>
                            <button id="checkout-and-portal-button" type="submit" className='btn btn-primary  mb-4' onClick={() => handleSubscription()}>
                                Subscribe
                            </button>
                        </div>
                    </div>


                    {/* Doctors */}
                    <hr />
                    <div className='pricing-plans'>
                        <h1>Plans For Doctors</h1>
                        <div className="plans-container">
                            <div className="plan">
                                <div className="offer">
                                    <h2>Free</h2>
                                    <div>
                                        <span className="price">$0</span>
                                        <span className="period">/mo</span>
                                    </div>
                                    <p>Up to <strong>3</strong> Appointments</p>
                                </div>
                                <ul>
                                    <li>Access to all features</li>
                                    <li>Email & chat support</li>

                                </ul>
                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary' onClick={() => handleSubscription()}>
                                    free trial
                                </button>
                            </div>
                            <div className="plan">
                                <div className="offer pt-4">
                                    <h2>Monthly</h2>
                                    <div>
                                        <span className="price">$15</span>
                                        <span className="period">/mo</span>
                                    </div>
                                    <p><strong>Unlimited</strong> Appointment</p>
                                </div>
                                <ul>
                                    <li>Access to all features</li>
                                    <li>personalized Dashboard </li>
                                    <li>Accept or Decline appointments</li>
                                    <li>Email & chat support</li>
                                    <li>
                                        Launch discount
                                    </li>
                                </ul>

                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary mb-4' onClick={() => handleSubscription()}>
                                    Subscribe
                                </button>
                            </div>
                            <div className="plan">
                                <div className="offer pt-4">
                                    <h2>Yearly</h2>
                                    <div>
                                        <span className="price">$150</span>
                                        <span className="period">/year</span>
                                    </div>
                                    <p>Discount<strong> 10%</strong> off</p>
                                </div>
                                <ul>
                                    <li>Access to all features</li>
                                    <li>personalized Dashboard </li>
                                    <li>Accept or Decline appointments</li>
                                    <li>Email & chat support</li>
                                    <li>Launch discount</li>
                                </ul>

                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary  mb-4' onClick={() => handleSubscription()}>
                                    Subscribe
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Pricing
