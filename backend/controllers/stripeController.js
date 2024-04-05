const errorHandler = require("../middlewares/errorHandler")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


const createCheckoutSession = async (req, res) => {
    try {
        const prices = await stripe.prices.list({
            lookup_keys: [req.body.lookup_key],
            expand: ['data.product'],
          });

          const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
              {
                price: prices.data[0].id,
                quantity: 1,
        
              },
            ],
            mode: 'subscription',
            success_url: `${process.env.DOMAIN}/success`,
            cancel_url: `${process.env.DOMAIN}/cancelled`,
          });
        
          res.redirect(303, session.url);
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { createCheckoutSession }