import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { payment } from "../../api/stripe";
import CheckoutForm from "../../components/CheckoutForm";
import useEcomStore from "../../store/ecom-store";

const stripePromise = loadStripe("pk_test_51SbHXGGfmYSUd3hAHi4fLorhbY8LD8Xx7yVVFqw4nnuBMPt0y6tcuwEYvV9Z1sZE0yNfVbMmNch9U2O3xdJKF42S00ETcqTNng");


const Payment = () => {

    const token = useEcomStore((state) => state.token)

    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {

        payment(token)
            .then((res) => {

                setClientSecret(res.data.clientSecret)

            })
            .catch((err) => {
                console.log(err)
            })


    }, []);

    const appearance = {
        theme: 'stripe',
    };

    const loader = 'auto';

    return (

        <div >

            {
                clientSecret && (
                    <Elements options={{ clientSecret, appearance, loader }}
                        stripe={stripePromise}>
                        <CheckoutForm />

                    </Elements>
                )
            }

        </div>


    )
}

export default Payment
