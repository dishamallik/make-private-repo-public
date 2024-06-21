import { Link } from 'react-router-dom';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import useMenu from "../../src/hook/useMenu";

const Top = () => {
    const [menu] = useMenu();

    // Sort the scholarships based on application fees and recent post date.
    const sortedMenu = [...menu].sort((a, b) => {
        const feeComparison = a.applicationFees - b.applicationFees;
        if (feeComparison !== 0) {
            return feeComparison;
        }
        return new Date(b.postDate) - new Date(a.postDate);
    });

    // Get the top 6 scholarships
    const topSixScholarships = sortedMenu.slice(0, 6);

    return (
        <div className="container mx-auto p-4">
            {/* TOP SCHOLARSHIP Heading */}
            <div className="border-b-2 border-violet-600 w-3/4 sm:w-1/2 lg:w-1/4 mx-auto mt-2"></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Top Scholarship</h1>
            <div className="border-b-2 border-violet-600 w-3/4 sm:w-1/2 lg:w-1/4 mx-auto mt-2 mb-6 sm:mb-10"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topSixScholarships.map((item) => (
                    <div key={item._id} className="max-w-sm mx-auto rounded overflow-hidden shadow-2xl bg-violet-200">
                        {/* University Image/logo */}
                        <img className="w-full h-40 object-cover object-center" src={item.universityImage} alt="University Image" />

                        <div className="px-4 py-2 sm:px-6 sm:py-4">
                            {/* University Name */}
                            <div className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">{item.universityName}</div>

                            {/* Scholarship category */}
                            <p className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-2">{item.scholarshipName}</p>

                            {/* University location/address */}
                            <p className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-2">{item.location}</p>

                            {/* Application Deadline */}
                            <p className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-2">Application Deadline: {item.applicationDeadline}</p>

                            {/* Subject Category */}
                            <p className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-2">Subject Category: {item.subjectCategory}</p>

                            {/* Application Fees */}
                            <p className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-2">Application Fees: ${item.applicationFees}</p>

                            {/* Rating Icons */}
                            <div className="flex items-center mb-1 sm:mb-2">
                                <FaStar className="text-yellow-500 mr-1" />
                                <FaStar className="text-yellow-500 mr-1" />
                                <FaStar className="text-yellow-500 mr-1" />
                                <FaStarHalfAlt className="text-yellow-500 mr-1" />
                                <FaRegStar className="text-yellow-500" />
                            </div>
                        </div>

                        <div className="px-4 py-2 sm:px-6 sm:py-4">
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

            {/* "All Scholarships" Button */}
            <div className="flex justify-center mt-4 sm:mt-6">
                <Link to="/all">
                    <button className="btn btn-primary">
                        View All Scholarships
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Top;
