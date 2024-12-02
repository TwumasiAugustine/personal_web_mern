/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
    const { userInfo, loading } = useContext(UserContext);
    const location = useLocation();

    const userData = userInfo.data;
    // Show a loading indicator while loading
    if (loading) return <div className='flex justify-center items-center h-screen text-black text-md'>Loading...</div>;

    // Redirect if user is not authenticated
    if (!userData || Object.keys(userData).length === 0) {
        return (
            <Navigate
                to='/'
                state={{ from: location }}
            />
        );
    }

    const userRoles = userInfo.data?.roles || [];
    // Redirect if user lacks required roles
    if (
        roles &&
        roles.length > 0 &&
        !roles.some((role) => userRoles.includes(role))
    ) {
        return (
            <Navigate
                to='/'
                state={{ from: location }}
            />
        );
    }

    return <Component {...rest} />;
};

export default PrivateRoute;