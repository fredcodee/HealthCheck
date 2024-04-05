import React, { useState, useEffect } from 'react'
import '../assets/styles/css/pricePage.css'
const pricePage = () => {
    const accountType = localStorage.getItem('AccountType').replace(/"/g, '')
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
                                    <form action="/api/stripe/create-checkout-session" method="POST">
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
                                    <form action="/api/stripe/create-checkout-session" method="POST">
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
                                    <form action="/api/stripe/create-checkout-session" method="POST">
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
                                    <form action="/api/stripe/create-checkout-session" method="POST">
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
                <hr />
                <div className='free-plan'>
                    <h3>Free plan</h3>
                    <p>Get 3 free appointments scheduled for free</p>
                    <form action="/api/stripe/create-checkout-session" method="POST">
                        {/* Add a hidden field with the lookup_key of your Price */}
                        <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
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