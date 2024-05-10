const errorHandler = require("../middlewares/errorHandler")
const appService = require("../services/appServices")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      customer_email: req.user.email,
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

    res.json({ url: session.url })
  } catch (error) {
    errorHandler.errorHandler(error, res)
  }
}

const webhook = async (req, res) => {
  let event = req.body;

  const endpointSecret = process.env.STRIPE_ENDPOINTSECRET
  if (endpointSecret) {
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
    let invoice = null;
    switch (event.type) {

      //failed
      case 'payment_intent.payment_failed':
        paymentIntent = event.data.object;
        console.log(`Payment failed: ${paymentIntent.last_payment_error.message}`);
        break;
      case 'payment_intent.canceled':
        paymentIntent = event.data.object;
        console.log(`Payment failed: ${paymentIntent.last_payment_error.message}`);
        break;
      case 'invoice.payment_failed':
        invoice = event.data.object;
        console.log(`Payment failed: ${invoice.last_payment_error.message}`);
        break;

      //Success
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        paymentIntent = true
        console.log(`PaymentIntent for ${paymentIntentSucceeded.amount} was successful!`);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        //notification for new paid subscription
        console.log(`Subscription created: ${subscription.id}`);
        break;
      case 'customer.subscription.updated' :
        subscription = event.data.object;
        stripeSubId = subscription.id
        mode = subscription.items.data[0].price.recurring.interval // "month" or "year"
        const customer = await stripe.customers.retrieve(subscription.customer);

        //for renewal
        if (subscription.status === 'canceled' && subscription.cancel_at_period_end) {
          const renewedSubscription = await renewSubscription(subscription);
          // Optionally, notify the customer about the renewal
          notifyCustomer(renewedSubscription);
        }
        //for subscription update
        await appService.updateSubscription(customer.email, mode.charAt(0).toUpperCase() + mode.slice(1), subscription.status === 'active' ? true : false);

        console.log(`Subscription updated: ${subscription.id}`);
        break;

        //sub automatic renewal
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        if (subscription.status === 'canceled' && subscription.cancel_at_period_end) {
          // Automatically renew the subscription
          const renewedSubscription = await renewSubscription(subscription);
          // Optionally, notify the customer about the renewal
          notifyCustomer(renewedSubscription);
        }
        break
      case 'invoice.payment_succeeded':
        invoiceSucceeded = event.data.object;
        invoice = true
        console.log(`Payment succeeded: ${invoiceSucceeded.number}`);
        break
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  }
}


// async function handlePaymentIntentSucceeded(paymentIntent, invoice, userEmail,type, mode) {
//   if(paymentIntent || invoice) {
//     await appService.updateSubscription(userEmail, type, mode)
//   }
// }

// Function to renew the subscription
async function renewSubscription(subscription) {
  try {
    // Create a new subscription for the customer with the same plan
    const renewedSubscription = await stripe.subscriptions.create({
      customer: subscription.customer,
      items: [{ price: subscription.items.data[0].price.id }], // Use the same price as the expired subscription
      expand: ['latest_invoice.payment_intent'],
    });
    
    return renewedSubscription;
  } catch (error) {
    console.error('Error renewing subscription:', error.message);
    throw error;
  }
}

// Function to notify the customer about the renewal
function notifyCustomer(subscription) {
  // Implement notification logic (e.g., send an email, push notification, etc.)
  console.log('Customer notified about subscription renewal:', subscription.id);
}



module.exports = { createCheckoutSession, webhook }