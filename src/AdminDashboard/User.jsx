
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaChevronDown } from 'react-icons/fa';

const User = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to make admin!',
                    });
                }
            })
            .catch(error => {
                console.error('Error making admin:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
    };

    const handleMakeModerator = user => {
        axiosSecure.patch(`/users/moderator/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is a Moderator Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to make moderator!',
                    });
                }
            })
            .catch(error => {
                console.error('Error making moderator:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
    };

    const handleDeleteUser = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your file has been deleted.',
                                icon: 'success'
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Failed to delete user!',
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting user:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        });
                    });
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' || user.role === 'moderator' ? (
                                        user.role.charAt(0).toUpperCase() + user.role.slice(1)
                                    ) : (
                                        <div className="dropdown">
                                            <button className="btn btn-lg bg-orange-500 text-white flex items-center">
                                                Assign Role <FaChevronDown className="ml-2" />
                                            </button>
                                            <div className="dropdown-content bg-white shadow rounded-lg">
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                                >
                                                    Make Admin
                                                </button>
                                                <button
                                                    onClick={() => handleMakeModerator(user)}
                                                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                                >
                                                    Make Moderator
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg"
                                    >
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
