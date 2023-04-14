require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);

var app = express();
var cors = require('cors');
const corsOptions = {
    origin: 'https://flirtbot.pages.dev/',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
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
    res.json({ url: session.url });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
