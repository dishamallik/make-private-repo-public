import { useState, useEffect } from 'react';
import { AiOutlineInfoCircle, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageApplications = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('');
    const [filterCriteria, setFilterCriteria] = useState({ university: '', degree: '' });

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axiosSecure.get('/applications');
                setApplications(response.data);
                setFilteredApplications(response.data); // Initial filter is all applications
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchApplications();
    }, [axiosSecure]);

    useEffect(() => {
        let updatedApplications = [...applications];

        // Apply filtering
        if (filterCriteria.university) {
            updatedApplications = updatedApplications.filter(app => 
                app.universityName.toLowerCase().includes(filterCriteria.university.toLowerCase()));
        }
        if (filterCriteria.degree) {
            updatedApplications = updatedApplications.filter(app => 
                app.degree.toLowerCase().includes(filterCriteria.degree.toLowerCase()));
        }

        // Apply sorting
        if (sortCriteria) {
            updatedApplications.sort((a, b) => {
                if (sortCriteria === 'applicationFees') {
                    return a.applicationFees - b.applicationFees;
                } else {
                    return a[sortCriteria].localeCompare(b[sortCriteria]);
                }
            });
        }

        setFilteredApplications(updatedApplications);
    }, [applications, filterCriteria, sortCriteria]);

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
            <div className="mb-4">
                <label className="mr-2">Sort by:</label>
                <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
                    <option value="">Select</option>
                    <option value="email">Email</option>
                    <option value="universityName">University</option>
                    <option value="degree">Degree</option>
                    <option value="applicationFees">Application Fees</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="mr-2">Filter by University:</label>
                <input 
                    type="text" 
                    placeholder="University" 
                    value={filterCriteria.university} 
                    onChange={(e) => setFilterCriteria({ ...filterCriteria, university: e.target.value })}
                />
                <label className="ml-4 mr-2">Filter by Degree:</label>
                <input 
                    type="text" 
                    placeholder="Degree" 
                    value={filterCriteria.degree} 
                    onChange={(e) => setFilterCriteria({ ...filterCriteria, degree: e.target.value })}
                />
            </div>
            <table className="table-auto w-full border-collapse border border-violet-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">University</th>
                        <th className="border px-4 py-2">Subject Category</th>
                        <th className="border px-4 py-2">Degree</th>
                        <th className="border px-4 py-2">Application Fees</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApplications.map((application) => (
                        <tr key={application._id} className="border-b">
                            <td className="border px-4 py-2">{application.email}</td>
                            <td className="border px-4 py-2">{application.phone}</td>
                            <td className="border px-4 py-2">{application.universityName}</td>
                            <td className="border px-4 py-2">{application.subjectCategory}</td>
                            <td className="border px-4 py-2">{application.degree}</td>
                            <td className="border px-4 py-2">${application.applicationFees}</td>
                            <td className="border px-4 py-2">
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
                                    className="text-red-500"
                                    onClick={() => handleCancel(application._id)}
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageApplications;
