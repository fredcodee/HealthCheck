const errorHandler = require("../middlewares/errorHandler")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


const createCheckoutSession = async (req, res) => {
    try {
          const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
              {
                price: req.body.lookup_key,
                quantity: 1,
        
              },
            ],
            mode: 'subscription',
            success_url: `${process.env.DOMAIN}/success`,
            cancel_url: `${process.env.DOMAIN}/cancelled`,
          });
        
          res.json({url: session.url}) 
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

module.exports = { createCheckoutSession }