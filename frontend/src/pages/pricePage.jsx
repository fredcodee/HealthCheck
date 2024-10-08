import React, { useState, useEffect } from 'react'
import '../assets/styles/css/pricePage.css'
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
        const storedType = localStorage.getItem('type') ? localStorage.getItem('type').replace(/"/g, ''): false;
        const storedSubscription_Mode = localStorage.getItem('subscription_Mode') ? localStorage.getItem('subscription_Mode').replace(/"/g, '') : false;

        setAccountType(storedAccountType);
        setToken(storedToken);
        setType(storedType);
        setSubscription_Mode(storedSubscription_Mode);
    }, []);


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
            if(url.includes('/success')){
                localStorage.removeItem('token');
                localStorage.removeItem('AccountType');
                localStorage.removeItem('FreeTrail');
                localStorage.removeItem('subscription_Mode');
                localStorage.removeItem('type');
                window.location.href = url;
            }
            else{
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
            <section className='text-center'>
                <div style={{ color: 'black' , fontFamily: 'cursive'}}>
                    <p>Welcome, please choose a Subscription package to avail all our features </p>
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
                                <div>
                                    <h5> $15.00 / month</h5>
                                    <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_DOCTOR_MONTH_PRICE_ID} />
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
                                        {
                                            type == "Yearly" ? (
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
                                <div>
                                    <h5> $150.00 / year</h5>
                                    <form onSubmit={handleSubmit}>
                                        {/* Add a hidden field with the lookup_key of your Price */}
                                        <input type="hidden" name="lookup_key" value={import.meta.env.VITE_STRIPE_DOCTOR_YEAR_PRICE_ID} />
                                        {
                                            type == "Yearly" ? (
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
                        {
                            type == "Free" && subscription_Mode == "true" ? (
                                <button id="checkout-and-portal-button" type="button" className='btn btn-secondary'>
                                    <i class="fa fa-lock" aria-hidden="true"></i>
                                    Current plan
                                </button>
                            ) : (
                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                    Free trial
                                </button>
                            )
                        }
                    </form>
                </div>
            </section>
        </div>
    )
}

export default pricePage