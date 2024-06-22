import React, { useState, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Details = () => {
    const { id } = useParams(); // Extracting _id from URL params
    const [scholarship, setScholarship] = useState(null);

    useLayoutEffect(() => {
        // Fetch scholarship details based on id
        fetch(`https://b9-12-server.vercel.app/menu/${id}`)
            .then(response => response.json())
            .then(data => setScholarship(data))
            .catch(error => console.error('Error fetching scholarship details:', error));
    }, [id]);

    if (!scholarship) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{scholarship.scholarshipName}</h1>
            <div className="rounded overflow-hidden shadow-lg bg-violet-200">
                {/* University Image */}
                <img className="w-full object-cover h-64" src={scholarship.universityImage} alt="University Image" />
                <div className="p-4">
                    {/* University Name */}
                    <div className="font-bold text-xl mb-2">{scholarship.universityName}</div>
                    
                    {/* Scholarship Category */}
                    <p className="text-gray-700 text-base mb-2">Scholarship Category: {scholarship.scholarshipCategory}</p>
                    
                    {/* University Country */}
                    <p className="text-gray-700 text-base mb-2">University Country: {scholarship.universityCountry}</p>
                    
                    {/* Application Deadline */}
                    <p className="text-gray-700 text-base mb-2">Application Deadline: {scholarship.applicationDeadline}</p>
                    
                    {/* Subject Category */}
                    <p className="text-gray-700 text-base mb-2">Subject Category: {scholarship.subjectCategory}</p>
                    
                    {/* Scholarship Post Date */}
                    <p className="text-gray-700 text-base mb-2">Scholarship Post Date: {scholarship.scholarshipPostDate}</p>
                    
                    {/* Service Charge */}
                    <p className="text-gray-700 text-base mb-2">Service Charge: ${scholarship.serviceCharge}</p>
                    
                    {/* Application Fees */}
                    <p className="text-gray-700 text-base mb-4">Application Fees: ${scholarship.applicationFees}</p>
                    
                    {/* Apply Scholarship Button */}
                    <Link to="/apply">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Apply Scholarship
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Details;
