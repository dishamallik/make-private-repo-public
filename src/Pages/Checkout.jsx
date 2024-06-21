import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from '../hook/useAxiosSecure';
import useMenu from '../hook/useMenu';
import useAuth from "../hook/useAuth";

const Checkout = () => {
    const stripe = useStripe();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const elements = useElements();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [menu] = useMenu();
    const { user } = useAuth();

    // Calculate total price ensuring it's a valid number
    const totalPrice = menu.reduce((total, item) => total + (item.applicationFees || 0), 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error('Error creating payment intent:', error);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        setLoading(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        setLoading(false);

        if (error) {
            console.log('paymentMethod error', error);
            setError(error.message);
        } else {
            console.log('paymentMethod', paymentMethod);
        }
        
// confirm payment
const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
        card: card,
        billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
        }
    }
})

if (confirmError) {
    console.log('confirm error')
}
else{
    console.log('payment intent', paymentIntent)
    if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            userId: user._id,
            menuId: menu.map(item => item._id),
            status: 'pending'
        }

        const res = await axiosSecure.post('/payments', payment);
        console.log('payment saved', res.data);
        // refetch();
        // if (res.data?.paymentResult?.insertedId) {
        //     Swal.fire({
        //         position: "top-end",
        //         icon: "success",
        //         title: "Thank you for the taka paisa",
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        //     navigate('/dashboard/paymentHistory')
        // }

    }
}



    };

    return (
        <div>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-sm mt-5" type="submit" disabled={!stripe || !clientSecret || loading}>
                    Pay
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </div>
    );
};

export default Checkout;