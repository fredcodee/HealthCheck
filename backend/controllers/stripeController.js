const errorHandler = require("../middlewares/errorHandler")
const appService = require("../services/appServices")

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

const webhook =  async (req, res) => {
  let event = req.body;
  const endpointSecret = process.env.STRIPE_ENDPOINTSECRET
  if(endpointSecret){
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    // Handle the event
    let paymentIntent = null;
    let subscription = null;
  switch (event.type) {
    case 'payment_intent.succeeded':
      paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      paymentIntent = event.data.object;
      console.log(`Payment failed: ${paymentIntent.last_payment_error.message}`);
      break;
    case 'payment_intent.canceled':
      paymentIntent = event.data.object;
      console.log(`Payment failed: ${paymentIntent.last_payment_error.message}`);
      break;
    case 'customer.subscription.created':
      subscription = event.data.object;
      console.log(`Subscription created: ${subscription.id}`);
      break;
    case 'customer.subscription.trial_will_end':
      subscription = event.data.object;
      console.log(`Subscription trial will end: ${subscription.id}`);
      break;
    case 'invoice.payment_failed':
      const invoice = event.data.object;
      console.log(`Payment failed: ${invoice.last_payment_error.message}`);
      break;

    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
  }
}

module.exports = { createCheckoutSession, webhook }