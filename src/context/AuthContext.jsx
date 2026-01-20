import React, { createContext, useContext, useState, useEffect } from 'react';
import platformClient from 'purecloud-platform-client-v2';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // TODO: Replace with your actual Genesys Cloud Client ID
    // You need to create an OAuth Client (Implicit Grant) in Genesys Cloud Admin
    // and set the Redirect URI to match your local dev URL (e.g., http://localhost:5173)
    const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
    const REDIRECT_URI = window.location.origin; // e.g. http://localhost:5173

    useEffect(() => {
        const client = platformClient.ApiClient.instance;

        // Set environment using the one from App.jsx or default
        // App.jsx used: 'https://apps.sae1.pure.cloud/genesys-bootstrap/genesys.min.js' 
        // which implies 'mypurecloud.com' or specific region. 
        // 'sae1' usually suggests a specific environment, but the SDK needs the region string.
        // The user's URL was login.mypurecloud.com. Let's try mypurecloud.com first.
        // If sae1 is a specific region, we might need to adjust.
        // Using default mypurecloud.com for now.
        client.setEnvironment('sae1.pure.cloud');

        // We will just try to check if we are already logged in or if there is a hash
        client.loginImplicitGrant(CLIENT_ID, REDIRECT_URI, { state: 'state' })
            .then((data) => {
                console.log('Logged in successfully', data);
                setIsAuthenticated(true);

                // Optionally fetch user details here
                const usersApi = new platformClient.UsersApi();
                return usersApi.getUsersMe();
            })
            .then((me) => {
                setUser(me);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Authentication error or not logged in yet', err);
                setIsAuthenticated(false);
                setLoading(false);
            });
    }, []);

    const login = () => {
        // Checking if the user provided a specific custom URL.
        // The user shared: https://login.mypurecloud.com/?rid=R-RLs0Xq_Lr4-LDbn2rWo69oLRm3LNhm89P55IxAja0#/authenticate
        // If we want to strictly follow that:
        // window.location.href = 'https://login.mypurecloud.com/?rid=R-RLs0Xq_Lr4-LDbn2rWo69oLRm3LNhm89P55IxAja0#/authenticate';

        // BUT the standard way is:
        const client = platformClient.ApiClient.instance;
        client.loginImplicitGrant(CLIENT_ID, REDIRECT_URI, { state: 'login' });
    };

    const logout = () => {
        const client = platformClient.ApiClient.instance;
        client.logout(REDIRECT_URI);
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
