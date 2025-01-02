import React from 'react'
import Navbar from '../components/Navbar'

const SuccessPage = () => {
    return (
        <div>
            <Navbar />
        <section>
          <div className="product Box-root">
            <div className="description Box-root text-center">
              <h3>Subscription successful!</h3>
              <p>
                Your subscription has been successfully created. you can now avail all our features.
              </p>
              <a href="/dashboard">Back to Home</a>
            </div>
          </div>
        </section>
        </div>
      );
}

export default SuccessPage