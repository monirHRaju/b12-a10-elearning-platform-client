import React, { use } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    // const location = useLocation();
    // console.log(location)

    if (loading) {
        return <span className="loading loading-spinner text-success"></span>
    }

    if (!user) {
        return <Navigate state={location?.pathname} to="/login"></Navigate>;
    }

    return children
};

export default PrivateRoute;