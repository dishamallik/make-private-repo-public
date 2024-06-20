import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hook/useAuth';
import { useForm } from 'react-hook-form';

import logo3 from "../assets/Sign up-bro.png"
import useAxiosPublic from '../hook/useAxiosPublic';
import SocialLogin from './SocialLogin';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    const onSubmit = (data) => {
        const { email, password, fullName, image } = data;
        createUser(email, password)
            .then(() => {
                return updateUserProfile(fullName, image);
            })
            .then(() => {
                const userInfo ={
                    name: fullName,
                    email: email,
                    image: image

                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    if(res.data.insertedId){
                        console.log('added to the database')
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful!',
                            text: 'You have been successfully registered.',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            navigate(from);
                        });
                    }
                })
               
            })
            .catch(error => {
                setError('Failed to register. Please try again.');
                console.error('Registration Error:', error);
            });
    };

    return (
        <div>
            <div>
            <div className="hero min-h-screen bg-violet-50">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <div className="max-w-96">
                            <img src={logo3} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="text-left">
                            <h1 className="text-5xl text-violet-700 font-bold mb-5">Register Now!</h1>
                        </div>
                        <div className="card shrink-0 lg:w-96 max-w-sm shadow-2xl bg-violet-300">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        className="input input-bordered"
                                        {...register("fullName", { required: true })}
                                    />
                                    {errors.fullName && <span className="text-red-500">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image URL</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="photo"
                                        placeholder="Image URL"
                                        className="input input-bordered"
                                        {...register("image", { required: true })}
                                    />
                                    {errors.image && <span className="text-red-500">This field is required</span>}
                                </div>
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
                                    {errors.email && <span className="text-red-500">This field is required</span>}
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
                                    {errors.password && <span className="text-red-500">This field is required</span>}
                                </div>
                                {error && <p className="text-red-500 mb-4">{error}</p>}
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-outline bg-violet-500">Register</button>
                                </div>
                                <p>Already have an account? Please <Link to="/login"><button className="btn-link">log in</button></Link></p>
                            </form>
                            <div className="mb-5">
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
   </div>
        </div>
    );
};

export default Register;


  
        