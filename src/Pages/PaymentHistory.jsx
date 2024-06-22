import { useQuery } from '@tanstack/react-query';
import useAuth from '../hook/useAuth';
import useAxiosSecure from '../hook/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    const paymentDetails = payments.map(payment => {
        const {
            _id,
            email,
            name,
            price: { $numberInt: price },
            transactionId,
            date,
            menuDetails,
            status
        } = payment;

        return {
            _id,
            email,
            name,
            price,
            transactionId,
            date,
            menuDetails,
            status
        };
    });

    return (
        <div>
            <h2 className="text-3xl">Total Payments: {payments.length}</h2>
            <div>
                {paymentDetails.map(payment => (
                    <div key={payment._id} className="payment-card">
                        <h3 className="text-2xl">Name: {payment.name}</h3>
                        <p>Email: {payment.email}</p>
                        <p>Transaction ID: {payment.transactionId}</p>
                        <p>Price: ${payment.price}</p>
                        <p>Date: {new Date(payment.date).toLocaleString()}</p>
                        <p>Status: {payment.status}</p>
                        <div>
                            <h4 className="text-xl">Menu Details:</h4>
                            <ul>
                                {payment.menuDetails.map(detail => (
                                    <li key={detail._id}>
                                        <p>University Name: {detail.universityName}</p>
                                        <p>Scholarship Name: {detail.scholarshipName}</p>
                                        <p>Subject Category: {detail.subjectCategory}</p>
                                        <p>University Country: {detail.universityCountry}</p>
                                        <p>Application Fees: ${detail.applicationFees.$numberInt}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentHistory;
