import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from '../hook/useAxiosSecure'


const MyApp = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axiosSecure.get('/applications');
                setApplications(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchApplications();
    }, [axiosSecure]);

    const handleDetails = (id) => {
        navigate(`/application-details/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/edit-application/${id}`);
    };

    const handleCancel = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/applications/${id}`);
                setApplications(applications.filter(app => app._id !== id));
                Swal.fire('Deleted!', 'Your application has been deleted.', 'success');
            } catch (err) {
                Swal.fire('Error!', 'Failed to delete the application.', 'error');
            }
        }
    };

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p>Error loading applications: {error.message}</p>;
    return (
        <div>
        <h1 className="text-xl font-bold mb-4">Manage Applications</h1>
        <table className="table-auto w-full border-collapse border border-violet-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">University Name</th>
                    

                    <th className="border px-4 py-2">Subject Category</th>
  
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((application) => (
                    <tr key={application._id} className="border-b">
                        <td className="border px-4 py-2">{application.universityName}</td>
                 

                        <td className="border px-4 py-2">{application.subjectCategory}</td>

                       
                        <td className="border px-4 py-2 flex items-center">
                            <button
                                className="text-blue-500 mr-2"
                                onClick={() => handleDetails(application._id)}
                            >
                                <AiOutlineInfoCircle size={20} />
                            </button>
                            <button
                                className="text-yellow-500 mr-2"
                                onClick={() => handleEdit(application._id)}
                            >
                                <AiOutlineEdit size={20} />
                            </button>
                            <button
                                className="text-red-500 mr-2"
                                onClick={() => handleCancel(application._id)}
                            >
                                <AiOutlineDelete size={20} />
                            </button>
                            <button
                                className="text-green-500"
                                onClick={() => navigate(`/add-review/${application._id}`)}
                            >
                                Add Review
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default MyApp;