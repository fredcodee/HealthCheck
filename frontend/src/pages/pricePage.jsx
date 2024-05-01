import React, { useState, useEffect } from 'react'
import '../assets/styles/css/pricePage.css'
import Api from '../Api';
const pricePage = () => {
    const accountType = localStorage.getItem('AccountType').replace(/"/g, '')
    const token = localStorage.getItem('token')
    const [error, setError] = useState('')

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
            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            setError('Failed to create checkout session, try again later');
            console.error(error);
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
                setError('Failed to create checkout session, try again later');
            })
        }
        catch (error) {
            setError('Failed to create checkout session, try again later');
            console.error(error);
        }
    }

    return (
        <div>
            <section className='text-center'>
                <div>
                    <p>Welcome, please choose a Subscription mode to avail all our features </p>
                </div>
                <div className="product">
                    <div className="row">
                        <div className="col description">
                            <h3>Starter plan</h3>
                            {accountType == "Patient" ? (
                                <div>
                                    <h5> $3.00 / month</h5>
                                    <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_PATIENT_MONTH_PRICE_ID} />
                                        <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                            Subscribe
                                        </button>
                                    </form>
                                </div>

                            ) : (
                                <div>
                                    <h5> $15.00 / month</h5>
                                    <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_DOCTOR_MONTH_PRICE_ID} />
                                        <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                        <div className="col description">
                            <h3>Yearly plan</h3>
                            {accountType == "Patient" ? (
                                <div>
                                    <h5> $30.00 / year</h5>
                                    <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_PATIENT_YEAR_PRICE_ID} />
                                        <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <h5> $150.00 / year</h5>
                                    <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_DOCTOR_YEAR_PRICE_ID} />
                                        <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {error && <p className="error-message">{error} !</p>}
                </div>
                <hr />
                <div className='free-plan'>
                    <h3>Free plan</h3>
                    <p>Get 3 free appointments scheduled for free</p>
                    <form onSubmit={handleFreeTrial}>
                        <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                            Free trial
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default pricePage