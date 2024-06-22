 import { useQuery } from '@tanstack/react-query';
import useAuth from '../hook/useAuth';
import useAxiosSecure from '../hook/useAxiosSecure'

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
           <h2 className="text3-xl">Total Payments: {payments.length}</h2>
        </div>
    );
};

export default PaymentHistory;