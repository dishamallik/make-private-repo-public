
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useMenu from '../hook/useMenu';
import useAxiosSecure from '../hook/useAxiosSecure';


const ManageScholarships = () => {
    const [menu] = useMenu();
    const axiosSecure = useAxiosSecure();
    const handleDeleteItem =  (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }

    return (
        <div>
             <div className="border border-violet-300 p-4 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-violet-600">
                    Manage item
                </h1>
            </div>
            <div>
            <div>
          
            <div>
           
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>item Name</th>
                                <th>University Name</th>
                                <th>Subject Category</th>
                                <th>Applied Degree</th>
                                <th>Application Fees</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.scholarshipName}</td>
                                    <td>{item.universityName}</td>
                                    <td>{item.subjectCategory}</td>
                                    <td>{item.degree}</td>
                                    <td>${item.applicationFees}</td>
                                    <td>
                                        <div className="flex justify-center space-x-2">
                                            {/* <Link to={`/details/${item._id}`}>
                                                <button className="btn btn-sm btn-primary" title="Details">
                                                    <FaInfoCircle />
                                                </button>
                                            </Link> */}
                                            <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button
                                                className="btn btn-ghost btn-lg bg-orange-500">
                                                <FaEdit className="text-white 
                                        "></FaEdit>
                                            </button>
                                            </Link>
                                        
                                  
                                   
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>

            </div>
        </div>
    );
};

export default ManageScholarships;