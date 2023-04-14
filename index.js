require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);

var app = express();
var cors = require('cors');
app.use(cors({
    origin: 'https://flirtbot.pages.dev'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

app.post('/payment', async (req, res) => {
    const {amount} = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: amount,
                    product_data: {
                        name: 'abc',
                        description: 'abc',
                    },
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://flirtbot.pages.dev/cmp',
        cancel_url: 'http://flirtbot.pages.dev/cancel',
    });
    res.json({ id: session.id });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
