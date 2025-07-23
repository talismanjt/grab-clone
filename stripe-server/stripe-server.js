const express = require('express');
const app = express();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// This example sets up an endpoint using the Express framework.

app.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2025-06-30.basil'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'eur',
        customer: customer.id,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter
        // is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_API_KEY
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});