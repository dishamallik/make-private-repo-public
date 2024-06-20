import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ModAdd = () => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        setValue('postedUserEmail', user.email);
    }, [user.email, setValue]);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('image', data.universityImage[0]);

            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                const scholarshipData = {
                    scholarshipName: data.scholarshipName,
                    universityName: data.universityName,
                    universityImage: res.data.data.display_url,
                    universityCountry: data.universityCountry,
                    universityCity: data.universityCity,
                    universityWorldRank: parseInt(data.universityWorldRank),
                    subjectCategory: data.subjectCategory,
                    scholarshipCategory: data.scholarshipCategory,
                    degree: data.degree,
                    applicationFees: parseFloat(data.applicationFees),
                    serviceCharge: parseFloat(data.serviceCharge),
                    applicationDeadline: data.applicationDeadline,
                    scholarshipPostDate: data.scholarshipPostDate,
                    postedUserEmail: user.email
                };

                const menuRes = await axiosSecure.post('/menu', scholarshipData);
                console.log(menuRes.data);

                if (menuRes.data.insertedId) {
                    console.log('Scholarship added successfully!');
                    alert('Scholarship added successfully!');
                    reset(); // Reset the form
                    navigate('/'); // Navigate to another page
                }
            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error adding scholarship:', error);
            if (error.response && error.response.status === 403) {
                alert('You do not have the necessary permissions to perform this action.');
                navigate('/unauthorized'); // Navigate to an unauthorized page
            }
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Add Scholarship</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="label">Scholarship Name</label>
                    <input type="text" {...register('scholarshipName')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">University Name</label>
                    <input type="text" {...register('universityName')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">University Image</label>
                    <input type="file" {...register('universityImage')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">University Country</label>
                    <input type="text" {...register('universityCountry')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">University City</label>
                    <input type="text" {...register('universityCity')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">University World Rank</label>
                    <input type="number" {...register('universityWorldRank')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Subject Category</label>
                    <select {...register('subjectCategory')} className="select select-bordered w-full">
                        <option value="Agriculture">Agriculture</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                </div>
                <div>
                    <label className="label">Scholarship Category</label>
                    <select {...register('scholarshipCategory')} className="select select-bordered w-full">
                        <option value="Full fund">Full fund</option>
                        <option value="Partial">Partial</option>
                        <option value="Self-fund">Self-fund</option>
                    </select>
                </div>
                <div>
                    <label className="label">Degree</label>
                    <select {...register('degree')} className="select select-bordered w-full">
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                    </select>
                </div>
                <div>
                    <label className="label">Application Fees</label>
                    <input type="number" {...register('applicationFees')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Service Charge</label>
                    <input type="number" {...register('serviceCharge')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Application Deadline</label>
                    <input type="date" {...register('applicationDeadline')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Scholarship Post Date</label>
                    <input type="date" {...register('scholarshipPostDate')} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Posted User Email</label>
                    <input
                        type="email"
                        {...register('postedUserEmail')}
                        defaultValue={user.email}
                        className="input input-bordered w-full"
                        disabled // Ensure user cannot edit this field
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <Link to="/" className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Add Scholarship</button>
                </div>
            </form>
        </div>
    );
};

export default ModAdd;
