import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import useMenu from "../hook/useMenu";
import { Link } from "react-router-dom";

const AllSch = () => {
    const [menu] = useMenu();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Change this to the number of items per page you want

    // Filter items based on the search term
    const filteredMenu = menu.filter((item) =>
        item.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subjectCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get the items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMenu = filteredMenu.slice(startIndex, startIndex + itemsPerPage);

    // Calculate total pages
    const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            {/* Search Box */}
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by University, Scholarship, or Subject"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/2"
                />
                <button
                    onClick={() => setCurrentPage(1)}
                    className="btn btn-primary ml-2"
                >
                    Search
                </button>
            </div>

            {/* Scholarship Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedMenu.map((item) => (
                    <div key={item._id} className="rounded overflow-hidden shadow-lg bg-violet-200">
                        {/* University Image/logo */}
                        <img className="w-full h-40 object-cover object-center" src={item.universityImage} alt="University Image" />

                        <div className="p-4">
                            {/* University Name */}
                            <div className="font-bold text-xl mb-2">{item.universityName}</div>

                            {/* Scholarship category */}
                            <p className="text-gray-700 text-base mb-2">{item.scholarshipName}</p>

                            {/* University location/address */}
                            <p className="text-gray-700 text-base mb-2">{item.location}</p>

                            {/* Application Deadline */}
                            <p className="text-gray-700 text-base mb-2">Application Deadline: {item.applicationDeadline}</p>

                            {/* Subject Category */}
                            <p className="text-gray-700 text-base mb-2">Subject Category: {item.subjectCategory}</p>

                            {/* Application Fees */}
                            <p className="text-gray-700 text-base mb-2">Application Fees: ${item.applicationFees}</p>

                            {/* Rating Icons */}
                            <div className="flex items-center mb-2">
                                <FaStar className="text-yellow-500 mr-1" />
                                <FaStar className="text-yellow-500 mr-1" />
                                <FaStar className="text-yellow-500 mr-1" />
                                <FaStarHalfAlt className="text-yellow-500 mr-1" />
                                <FaRegStar className="text-yellow-500" />
                            </div>
                        </div>

                        <div className="p-4">
                            {/* Scholarship Details Button */}
                            <Link to={`/details/${item._id}`}>
                                <button className="btn btn-sm btn-primary" title="Details">
                                    Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllSch;