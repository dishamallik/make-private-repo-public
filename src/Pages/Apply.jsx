import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";


const Apply = () => {
    const stripePromise =  loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    return (
        <div>
            <div className="border border-violet-300 p-4 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-violet-600">
                    Apply Scholarship
                </h1>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <Checkout></Checkout>
                </Elements>
            </div>
        </div>
    );
};

export default Apply;