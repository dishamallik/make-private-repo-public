
import useAuth from '../../src/hook/useAuth';
import Chart from './Chart';

const ProfileA = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto p-4">
            {/* Profile Heading */}
            <h2 className="text-4xl font-bold text-center mb-8">Profile</h2>
            
            <div className="max-w-md mx-auto bg-violet-100 rounded-lg shadow-lg">
                <div className="flex flex-col items-center p-6">
                    {/* User Image */}
                    {user.displayName && (
                        <img
                            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
                            src={user.photoURL}
                            alt={`${user.displayName}'s profile`}
                        />
                    )}

                    {/* User Name */}
                    <h1 className="text-2xl font-semibold mb-2">{user.displayName}</h1>

                    {/* User Role (conditional) */}
                    {user.role && user.role !== 'admin' && (
                        <span className="badge badge-secondary mb-4">{user.role}</span>
                    )}

                    {/* Additional Information */}
                    {user.email && (
                        <p className="text-sm text-gray-700 mb-2">Email: {user.email}</p>
                    )}
                    {user.registrationDate && (
                        <p className="text-sm text-gray-700 mb-2">Registered on: {new Date(user.registrationDate).toLocaleDateString()}</p>
                    )}

                    {/* DaisyUI Example of Additional Information */}
                    {user.additionalInfo && (
                        <p className="text-sm text-gray-700 mb-2">Additional Info: {user.additionalInfo}</p>
                    )}
                </div>
            </div>
            <div><Chart></Chart></div>
        </div>
    );
};

export default ProfileA;
