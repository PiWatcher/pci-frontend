
// styling
import './Settings.css';

// page imports
import React from 'react';

// components
import CleanNavbar from '../Navigation/CleanNavbar';
import ChangePassword from './ChangePassword';

// administrator settings
const Settings = () => {

    // returns the the admin page and its child components
    return (
        <div className="settings-container">
            <CleanNavbar />
            <div className="settings-row">
                <ChangePassword />
            </div>
        </div >
    );
}

export default Settings;