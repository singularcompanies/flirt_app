import './App.css'
import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@chakra-ui/react';
const stripPromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

function Pay() {
    const handleCheckout = async (amount) => {
        const stripe = await stripPromise
        const response = await axios.post('https://whale-app-8pvd8.ondigitalocean.app/payment', {
            amount: amount
        })
        const session = await response.json()
        console.log(session)
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })
        if (result.error) {
            console.log(result.error.message)
        }
    }

    return (
        <div className="App">
            <Button w="28" mt="6" bg="white" onClick={() => handleCheckout(1000)}>
                Pay $10
            </Button>
        </div>
    )
}

export default Pay
