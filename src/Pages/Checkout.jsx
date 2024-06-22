import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from '../hook/useAxiosSecure';
import useMenu from '../hook/useMenu';
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [menu, , refetchMenu] = useMenu(); // Destructured `refetchMenu`
    const { user } = useAuth();
    const navigate = useNavigate();

    // Calculate total price ensuring it's a valid number
    const totalPrice = menu.reduce((total, item) => total + (item.applicationFees || 0), 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
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
        if (!card) {
            setError('Card information not available.');
            return;
        }

        setLoading(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        });
        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        setLoading(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id
        });
        setLoading(false);

        if (confirmError) {
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            // Get the first _id value from menu (assuming menu has at least one item)
            const menuId = menu.length > 0 ? menu[0]._id : null;

            const payment = {
                email: user.email,
                name: user.displayName,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                userId: user._id, // Assuming user._id is a single value
                menuId: menuId, // Single menu _id value
                status: 'pending',
            };

            try {
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                await refetchMenu(); // Refetch the menu data after payment is saved
                navigate('/paymentHistory');

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (err) {
                console.error('Error saving payment:', err);
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
            {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
        </div>
    );
};

export default Checkout;
