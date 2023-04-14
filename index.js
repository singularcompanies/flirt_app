require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);

var app = express();
var cors = require('cors');
app.use(cors({
    origin: 'https://flirtbot.pages.dev'
}));
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.post('/payment', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://flirtbot.pages.dev");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    const {amount} = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: amount,
                    product_data: {
                        name: 'Doctor Roleplay Character',
                        description: 'Unlock the ability to chat with AI Based Doctor',
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
