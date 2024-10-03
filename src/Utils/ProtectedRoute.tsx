import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, RouteProps, redirect } from 'react-router-dom';
import { RouteStrings } from './RouteStrings';
import Cookies from 'js-cookie'; 
import authAxiosInstance from '../Services/AxiosInstance/authaxiosIntance';
import { check } from '../Services/AuthService/authService';

type ProtectedRouteProps = RouteProps & {
    component: React.ComponentType<any>;
}

const ProtectedRoute : React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Make a request to a protected endpoint
                check().then((data) => {
                    if(data?.data?.status === "ok") setIsAuthenticated(true)
                }).catch((error) => {
                    setIsAuthenticated(false);
                }); // Adjust endpoint as needed
                setIsAuthenticated(true); // User is authenticated
            } catch (error) {
                setIsAuthenticated(false);
                 // User is not authenticated
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Optionally show a loading state
    }

    if (!isAuthenticated) {
        return <Navigate to={RouteStrings.login} replace />;
    }

    return <Outlet />;
};


export default ProtectedRoute
