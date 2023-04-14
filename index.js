require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();
app.use(cors());
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
        success_url: 'https://flirt.pages.dev/cmp',
        cancel_url: 'https://flirt.pages.dev/cancel',
    });
    res.json({ id: session.id });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});