import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import useAuth from '../hook/useAuth';
import useAdmin from '../hook/useAdmin';
import useModerator from '../hook/useModerator';

const Navbar = () => {
    const { logout, user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();

    const navLinks = (
        <>
            <li><NavLink to="/" >Home</NavLink></li>
            <li><NavLink to="/all" >All Scholarships</NavLink></li>
           
            {isModerator && !isAdmin && (
                <li><NavLink to="/dashboard/manageReviews">Manage Reviews</NavLink></li>
            )}
            {user && !isAdmin && !isModerator && (
                <li><NavLink to="/dashboard/myApplications">My Applications</NavLink></li>
            )}
            <li><NavLink to="/dashboard"> my Dashboard</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 mb-8">
            <div className="navbar-start flex items-center">
                <img src={logo} alt="Logo" className="h-10 w-auto ml-6" />
                <div className="btn btn-ghost text-2xl font-bold">UNIGO</div>
            </div>

            <div className="navbar-end flex items-center">
                {/* Dropdown for smaller screens */}
                <div className="dropdown lg:hidden relative">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute right-1">
                        {navLinks}
                        <li>
                            {user ? (
                                <div className="flex items-center ">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar relative">
                                        <div className="w-10 rounded-full overflow-hidden">
                                            <img alt="User" src={user?.photoURL || "https://i.ibb.co/df04xnj/user.jpg"} />
                                            <div className="absolute top-7 left-0 right-0 bg-opacity-50 transition-opacity opacity-0 hover:opacity-100 hover:bg-rose-100 hover:rounded-lg hover:text-white">
                                                <div className="text-black text-center py-2">{user?.displayName || "User"}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={logout} className="btn btn-outline bg-rose-400 ">Log Out</button>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <Link to="/login"><button className="btn btn-outline bg-rose-400 w-full">Log In</button></Link>
                                    <Link to="/register"><button className="btn btn-outline bg-rose-400 w-full">Register</button></Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>

                {/* Horizontal menu for larger screens */}
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>

                {/* Login and Register Buttons for large screens */}
                <div className="hidden lg:flex items-center space-x-2 ml-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar relative">
                                <div className="w-10 rounded-full">
                                    <img alt="User" src={user?.photoURL || "https://i.ibb.co/df04xnj/user.jpg"} />
                                    <div className="absolute top-7 left-0 right-0 bg-opacity-50 transition-opacity opacity-0 hover:opacity-100 hover:bg-rose-100 hover:rounded-lg hover:text-white">
                                        <div className="text-black text-center py-2">{user?.displayName || "user not found"}</div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={logout} className="btn btn-outline bg-violet-400">Log Out</button>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login"><button className="btn btn-outline bg-violet-400">Log In</button></Link>
                            <Link to="/register"><button className="btn btn-outline bg-violet-400">Register</button></Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
