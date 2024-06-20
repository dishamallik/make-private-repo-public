import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAxiosPublic from "../hook/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Add = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic(); // Axios instance for public routes (e.g., image upload)
    const axiosSecure = useAxiosSecure(); // Axios instance for secure routes (e.g., backend API)

    const onSubmit = async (data) => {
        try {
            // Prepare FormData for image upload
            const formData = new FormData();
            formData.append('image', data.universityImage[0]); // Assuming data.universityImage is FileList

            // Upload university image to imgbb.com
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                // Image upload successful, prepare scholarship data
                const scholarshipData = {
                    scholarshipName: data.scholarshipName,
                    universityName: data.universityName,
                    universityImage: res.data.data.display_url, // Image URL from imgbb.com
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
                    postedUserEmail: data.postedUserEmail
                };

                // Send scholarship data to your backend endpoint (/menu)
                const menuRes = await axiosSecure.post('/menu', scholarshipData);
                console.log(menuRes.data);

                // Handle success (e.g., show success message)
                if (menuRes.data.insertedId) {
                    // Show success message or redirect to another page
                    console.log('Scholarship added successfully!');
                }
            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error adding scholarship:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div>
            <div className="border border-violet-300 p-4 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-violet-600">
                    Add Scholarship
                </h1>
            </div>
            <div className="container mx-auto p-8">
                <h1 className="text-2xl font-bold mb-6">Add Scholarship</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Form fields */}
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
                        <input type="email" {...register('postedUserEmail')} className="input input-bordered w-full" />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Link to="/" className="btn btn-secondary">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Add Scholarship</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;
