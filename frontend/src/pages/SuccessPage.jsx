import React from 'react'

const SuccessPage = () => {
    return (
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
      );
}

export default SuccessPage