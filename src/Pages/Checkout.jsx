import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from '../hook/useAxiosSecure';
import useMenu from '../hook/useMenu';
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";


const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false); // New state for form visibility
    const axiosSecure = useAxiosSecure();
    const [menu, , refetchMenu] = useMenu();
    const { user } = useAuth();

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
            setFormVisible(true); // Show the form after successful payment

            const menuDetails = menu.map(item => ({
                _id: item._id,
                universityName: item.universityName,
                scholarshipName: item.scholarshipName,
                subjectCategory: item.subjectCategory,
                universityCountry: item.universityCountry,
                applicationFees: item.applicationFees
            }));

            const payment = {
                email: user.email,
                name: user.displayName,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                userId: user._id,
                menuDetails,
                status: 'pending',
            };

            try {
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                await refetchMenu();

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

    const handleApplicationSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const applicationData = {
            transactionId,
            email: user.email,
            phone: formData.get('phone'),
            photo: formData.get('photo'),
            address: {
                village: formData.get('village'),
                district: formData.get('district'),
                country: formData.get('country'),
            },
            gender: formData.get('gender'),
            degree: formData.get('degree'),
            sscResult: formData.get('sscResult'),
            hscResult: formData.get('hscResult'),
            studyGap: formData.get('studyGap') || null,
            universityName: formData.get('universityName'),
            scholarshipCategory: formData.get('scholarshipCategory'),
            subjectCategory: formData.get('subjectCategory'),
        };

        try {
            const res = await axiosSecure.post('/apply-scholarship', applicationData);
            if (res.data?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Application Submitted!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error('Error submitting application:', err);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: "There was a problem submitting your application. Please try again.",
                showConfirmButton: true
            });
        }
    };

    return (
        <div>
            {!formVisible ? (
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
            ) : (
                <form className="w-2/3 m-8" onSubmit={handleApplicationSubmit}>
                    <div>
                        <label>Phone:</label>
                        <input name="phone" type="text" required className="form-input" />
                    </div>
                    <div>
                        <label>Photo URL:</label>
                        <input name="photo" type="text" required className="form-input" />
                    </div>
                    <div>
                        <label>Village:</label>
                        <input name="village" type="text" required className="form-input" />
                    </div>
                    <div>
                        <label>District:</label>
                        <input name="district" type="text" required className="form-input" />
                    </div>
                    <div>
                        <label>Country:</label>
                        <input name="country" type="text" required className="form-input" />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select name="gender" required className="form-input">
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Applying Degree:</label>
                        <select name="degree" required className="form-input">
                            <option value="">Select</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Masters">Masters</option>
                        </select>
                    </div>
                    <div>
                        <label>SSC Result:</label>
                        <input name="sscResult" type="text" required className="form-input" />
                    </div>
                    <div>
                        <label>HSC Result:</label>
                        <input name="hscResult" type="text" required className="form-input" />
                    </div>
                    <div>
                        <label>Study Gap (if any):</label>
                        <select name="studyGap" className="form-input">
                            <option value="">None</option>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                            <option value="3+ Years">3+ Years</option>
                        </select>
                    </div>
                    <div>
                        <label>University Name:</label>
                        <input name="universityName" type="text" value={menu[0]?.universityName || ''} readOnly className="form-input" />
                    </div>
                    <div>
                        <label>Scholarship Category:</label>
                        <input name="scholarshipCategory" type="text" value={menu[0]?.scholarshipName || ''} readOnly className="form-input" />
                    </div>
                    <div>
                        <label>Subject Category:</label>
                        <input name="subjectCategory" type="text" value={menu[0]?.subjectCategory || ''} readOnly className="form-input" />
                    </div>
                    <button className="btn btn-primary btn-sm mt-5" type="submit">
                        Submit Application
                    </button>
                </form>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
        </div>
    );
};

export default Checkout;
