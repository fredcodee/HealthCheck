import React, { useState, useEffect } from 'react'
import '../assets/styles/css/pricePage.css'
import Navbar from '../components/Navbar';
import Api from '../Api';
const pricePage = () => {
    const [accountType, setAccountType] = useState(null);
    const [token, setToken] = useState(null);
    const [type, setType] = useState(null);
    const [subscription_Mode, setSubscription_Mode] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedAccountType = localStorage.getItem('AccountType') ? localStorage.getItem('AccountType').replace(/"/g, '') : null;
        const storedToken = localStorage.getItem('token');
        const storedType = localStorage.getItem('type') ? localStorage.getItem('type').replace(/"/g, '') : false;
        const storedSubscription_Mode = localStorage.getItem('subscription_Mode') ? localStorage.getItem('subscription_Mode').replace(/"/g, '') : false;

        setAccountType(storedAccountType);
        setToken(storedToken);
        setType(storedType);
        setSubscription_Mode(storedSubscription_Mode);
    }, [accountType, token, type, subscription_Mode]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiBaseUrl = import.meta.env.VITE_MODE === "Production"
            ? import.meta.env.VITE_API_BASE_URL_PROD
            : import.meta.env.VITE_API_BASE_URL_DEV;
        try {
            const { lookup_key: { value: lookupKey } } = event.target;
            const response = await fetch(`${apiBaseUrl}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${token.replace(/"/g, '')}` },
                body: JSON.stringify({ lookup_key: lookupKey }),
            });

            if (!response.ok) {
                setError('Failed to create checkout session, try again later');
            }

            const { url } = await response.json();
            if (url.includes('/success')) {
                localStorage.removeItem('token');
                localStorage.removeItem('AccountType');
                localStorage.removeItem('FreeTrail');
                localStorage.removeItem('subscription_Mode');
                localStorage.removeItem('type');
                window.location.href = url;
            }
            else {
                window.location.href = url;
            }
        } catch (error) {
            setError('Failed to create checkout session, try again later');
        }
    };

    const handleFreeTrial = async (event) => {
        event.preventDefault();
        try {
            await Api.get('api/free-trial', {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            }).then((response) => {
                if (response.status == 200) {
                    window.location.href = '/dashboard'
                }
                setError('Could not change to free trial, try again later');
            })
        }
        catch (error) {
            setError('Could not change to free trial, try again later');
        }
    }

    return (
        <div>
            <Navbar />
            <section className="pricing">
                <div>
                    {error && <p className="error-message">{error} !</p>}
                </div>
                <h1>Welcome, please choose a Subscription package to avail all our features </h1>
                <div className="pricing-plans">
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
                            <form onSubmit={handleFreeTrial}>
                                {
                                    type == "Free" && subscription_Mode == "true" ? (
                                        <button id="checkout-and-portal-button" type="button" className='btn btn-secondary'>
                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                            Current plan
                                        </button>
                                    ) : (
                                        <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                            Start free trial
                                        </button>
                                    )
                                }
                            </form>
                        </div>

                        {accountType == "Patient" ? (
                            <div className="plan">
                                <div className="offer">
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
                                <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_PATIENT_MONTH_PRICE_ID} />
                                        {
                                            type == "Month" ? (
                                                <button id="checkout-and-portal-button" type="button" className='btn btn-secondary'>
                                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                                    Current plan
                                                </button>
                                            ) : (
                                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                                    Subscribe
                                                </button>
                                            )
                                        }
                                    </form>
                            </div>
                        ) : (
                            <div className="plan">
                                <div className="offer">
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
                                <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_DOCTOR_MONTH_PRICE_ID} />
                                        {
                                            type == "Month" ? (
                                                <button id="checkout-and-portal-button" type="button" className='btn btn-secondary  mb-4'>
                                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                                    Current plan
                                                </button>
                                            ) : (
                                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary mb-4'>
                                                    Subscribe
                                                </button>
                                            )
                                        }
                                    </form>
                            </div>
                        )}
                        {accountType == "Patient" ? (
                            <div className="plan">
                                <div className="offer">
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
                                <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_PATIENT_YEAR_PRICE_ID} />
                                        {
                                            type == "Yearly" ? (
                                                <button id="checkout-and-portal-button" type="button" className='btn btn-secondary mb-4'>
                                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                                    Current plan
                                                </button>
                                            ) : (
                                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary  mb-4'>
                                                    Subscribe
                                                </button>
                                            )
                                        }
                                    </form>
                            </div>
                        ) : (
                            <div className="plan">
                                <div className="offer">
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
                                <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_DOCTOR_YEAR_PRICE_ID} />
                                        {
                                            type == "Yearly" ? (
                                                <button id="checkout-and-portal-button" type="button" className='btn btn-secondary  mb-4'>
                                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                                    Current plan
                                                </button>
                                            ) : (
                                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary  mb-4'>
                                                    Subscribe
                                                </button>
                                            )
                                        }
                                    </form>
                            </div>)}

                    </div>
                </div>
            </section>
        </div>
    )
}

export default pricePage