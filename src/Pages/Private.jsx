
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location);
    
    if(loading){
        return <span className="loading loading-dots loading-lg"></span>
    }
    
    if(!user){
        return <Navigate to='/login' state={location?.pathname
        || '/'}></Navigate>
    }
    return (
        <div>
            <div>
            {children}
        </div>
        </div>
    );
};

export default Private;