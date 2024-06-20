import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../hook/useAxiosPublic";


const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

    const handleSocialLogin = (socialProvider) => {
        socialProvider().then(result => {
            if (result.user) {
                navigate(from);
                console.log(result.user)
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    image: result.user.photoURL
                   
                    
                }
                axiosPublic.post('/users' , userInfo)
                .then(res =>{
                    console.log(res.data);
                })

            }
        }).catch(error => {
            console.error('Social login error:', error);
            // Handle error if needed
        });
    };

    return (
        <div className="text-center">
           < div className="border-b-2 border-violet-600 lg:w-48 mx-auto mt-2 mb-3"></div>
            <p> <button onClick={() => handleSocialLogin(googleLogin)} className="btn btn-wide bg-yellow-50"><FcGoogle />google</button></p>
        </div>
    );
};

export default SocialLogin;
