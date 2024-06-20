import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hook/useAuth';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';

import logo2 from "../assets/Fingerprint-pana.png"

const Login = () => {
    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'You have been successfully logged in.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate(from);
                });
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    if (error.code === 'auth/user-not-found') {
                        setEmailError('Email not registered');
                    } else {
                        setPasswordError('Invalid password');
                    }
                } else {
                    setError('Failed to log in');
                    console.error('Login Error:', error);
                }
            });
    };

    return (
        <div>
            <div className="hero min-h-screen bg-violet-50">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <div className="max-w-96">
                            <img src={logo2} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="text-left">
                            <h1 className="text-5xl mb-5 text-violet-400 font-bold">Login now!</h1>
                        </div>
                        <div className="card shrink-0 lg:w-96 max-w-sm shadow-2xl bg-violet-200">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="input input-bordered"
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <span>This field is required</span>}
                                    {emailError && <span className="text-red-500">{emailError}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="input input-bordered"
                                        {...register("password", { required: true })}
                                    />
                                    {errors.password && <span>This field is required</span>}
                                    {passwordError && <span className="text-red-500">{passwordError}</span>}
                                </div>
                                {error && <p className="text-red-500 mb-4">{error}</p>}
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-outline bg-violet-400">Login</button>
                                </div>
                                <p>New to UNIGO? Please <Link to="/register"><button className="btn-link">Register</button></Link></p>
                            </form>

                            <div className="mb-5">
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
