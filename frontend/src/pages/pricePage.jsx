import React, { useState, useEffect } from 'react'
import '../assets/styles/css/pricePage.css'
const pricePage = () => {
    return (
        <div>
            <section className='text-center'>
                <div>
                    <p>Welcome Name, please choose a Subscription mode to avail all our features </p>
                </div>
                <div className="product">
                    <div class="row">
                        <div class="col description">
                            <h3>Starter plan</h3>
                            <h5>$25.00 / month</h5>
                            <form action="/create-checkout-session" method="POST">
                                {/* Add a hidden field with the lookup_key of your Price */}
                                <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                    Subscribe
                                </button>
                            </form>
                        </div>
                        <div class="col description">
                            <h3>Yearly plan</h3>
                            <h5>$220.00 / year</h5>
                            <form action="/create-checkout-session" method="POST">
                                {/* Add a hidden field with the lookup_key of your Price */}
                                <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
                                <button id="checkout-and-portal-button" type="submit" className='btn btn-primary'>
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='free-plan'>
                    <h3>Free plan</h3>
                    <form action="/create-checkout-session" method="POST">
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