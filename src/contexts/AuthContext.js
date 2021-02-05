
// page imports
import React, { createContext, useState } from 'react';

// context that manages user login and authentication

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    // current authentication status
    const [authStatus, setAuthStatus] = useState(false);

    //  current user type
    const [userType, setUserType] = useState('');

    // submitted email
    const [email, setEmail] = useState('');

    // submitted password
    const [password, setPassword] = useState('');


    // POST to backend for authentication

    // if success, authStatus = true

    // if not success, authStatus remains false and display an error


    return (
        <AuthContext.Provider value={{ setEmail, setPassword, authStatus, setAuthStatus }}>
            { props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider