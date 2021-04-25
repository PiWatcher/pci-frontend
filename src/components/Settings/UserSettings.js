
// styling
import './UserSettings.css';

// page imports
import React from 'react';

// components
import CleanNavbar from '../Navigation/CleanNavbar';
import ChangePassword from './ChangePassword';


/** 
* Component: Settings
* 
* Home layout for user settings and child components
*/
const UserSettings = () => {


   /** 
   * Return: Settings JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div className="settings-container">
         <CleanNavbar />
         <div className="settings-row">
            <ChangePassword />
         </div>
      </div >
   );
}

export default UserSettings;