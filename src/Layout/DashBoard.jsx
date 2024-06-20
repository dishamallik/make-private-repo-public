import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaBook, FaList, FaUsers, FaCalendar, FaAd } from 'react-icons/fa';
import useAdmin from '../hook/useAdmin';
import useModerator from '../hook/useModerator';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator(); // Assuming useModerator hook for moderator role detection

    return (
        <div className="flex">
            {/* Dashboard sidebar */}
            <div className="w-64 min-h-screen bg-violet-400">
                <ul className="menu p-4">
                    {/* Admin specific links */}
                    {isAdmin && (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminProfile">
                                    <FaHome /> Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addScholarship">
                                    <FaBook /> Add Scholarship
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageScholarship">
                                    <FaList /> Manage Scholarships
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageApplications">
                                    <FaBook /> Manage Applied Applications
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers">
                                    <FaUsers /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageReviews">
                                    <FaList /> Manage Reviews
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Moderator specific links */}
                    {isModerator && (
                        <>
                            <li>
                                <NavLink to="/dashboard/moderatorProfile">
                                    <FaHome /> Moderator Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageScholarships">
                                    <FaList /> Manage Scholarships
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allReviews">
                                    <FaBook /> All Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/appliedScholarships">
                                    <FaBook /> All Applied Scholarships
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* User specific links */}
                    {!isAdmin && !isModerator && (
                        <>
                            <li>
                                <NavLink to="/dashboard/userProfile">
                                    <FaHome /> My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myApplications">
                                    <FaCalendar /> My Applications
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myReviews">
                                    <FaAd /> My Reviews
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
