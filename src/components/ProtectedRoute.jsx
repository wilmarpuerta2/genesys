import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Safe fallback if the user strictly wants to redirect to the raw URL provided,
// instead of letting the SDK handle the redirect construction.
const FALLBACK_LOGIN_URL = "https://login.mypurecloud.com/?rid=R-RLs0Xq_Lr4-LDbn2rWo69oLRm3LNhm89P55IxAja0#/authenticate";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, login } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            // Option 1: Trigger SDK login (which constructs the URL)
            // login();

            // Option 2: Strictly use the URL the user provided?
            // The SDK login is safer for maintaining the session state in the app.
            // However, if the user MUST use that specific RID, we can redirect there.
            // But typically that RID URL is a generated 'one-time' or 'session' link.
            // Using a static RID might be wrong.
            // I will assume the SDK implementation `login()` is the robust way,
            // but I will modify AuthContext to align with requirements if that fails.
            // For now, let's call login().
            login();
        }
    }, [loading, isAuthenticated, login]);

    if (loading) {
        return <div>Loading authentication...</div>;
    }

    if (!isAuthenticated) {
        return null; // or a spinner while redirecting
    }

    return children;
};

export default ProtectedRoute;
