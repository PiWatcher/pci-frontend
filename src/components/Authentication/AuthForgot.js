
// styling
import './AuthForgot.css';

// page imports
import React, { useContext, useState } from 'react';
import nauLogo from '../../images/nauLogoLogin.svg';

// components
import { Link } from 'react-router-dom';

// contexts
import { EnvironmentContext } from '../../contexts/EnvironmentContext';


/** 
* Component: AuthForgot
* 
* Takes user input and sends requests to the backend database to reset user account password
*/
const AuthForgot = () => {

   const { baseURL } = useContext(EnvironmentContext);

   const [localEmail, setLocalEmail] = useState('');

   const [localAuthCode, setLocalAuthCode] = useState('');

   const [localNewPassword, setLocalNewPassword] = useState('');

   const [localNewPasswordConf, setLocalNewPasswordConf] = useState('');

   const [emailSent, setEmailSent] = useState(false);

   const [codeVerified, setCodeVerified] = useState(false);

   const [resetConfirmed, setResetConfirmed] = useState(false);


   /** 
   * Function: handleFormInputChange
   * 
   * Takes user text input and sets it to state
   */
   const handleFormInputChange = (e) => {
      if (e.target.id === "email") {
         setLocalEmail(e.target.value);
      }

      else if (e.target.id === "auth-code") {
         setLocalAuthCode(e.target.value);
      }

      else if (e.target.id === "new-password") {
         setLocalNewPassword(e.target.value);
      }

      else if (e.target.id === "new-password-conf") {
         setLocalNewPasswordConf(e.target.value);
      }
   }


   /** 
   * Function: handleGetResetCode
   * 
   * Takes user email and sends to backend for verification and mail service to send reset code to
   */
   const handleGetResetCode = (e) => {

      // prevent page refresh after submit
      e.preventDefault();

   }


   /** 
   * Function: handleVerifyResetCode
   * 
   * Takes verification code and sends to backend for user authentication
   */
   const handleVerifyResetCode = (e) => {

      // prevent page refresh after submit
      e.preventDefault();

   }


   /** 
   * Function: handleConfirmReset
   * 
   * Takes new password and sends to backend for account update within the back end database
   */
   const handleConfirmReset = (e) => {

      // prevent page refresh after submit
      e.preventDefault();

   }

   /** 
   * Return: AuthForgot JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div className="login">
         <div className="wrapper">
            <img src={nauLogo} alt="NAU Logo" />

            <div className="reset-form">
               {resetConfirmed === true ?
                  <div className="forgot-password-div">
                     <div className="reset-text">Password has been reset successfully!</div>
                     <div className="return-link-div">
                        <Link to="/auth" className="return-link">
                           Return to sign in page.
                                </Link>
                     </div>
                  </div>
                  :
                  <div>
                     <div className="reset-text">Password Reset</div>
                     {codeVerified === true ?
                        <form onSubmit={handleConfirmReset}>
                           <input type="password" id="new-password" placeholder="new password"
                              pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleFormInputChange} required />
                           <input type="password" id="new-password-conf" placeholder="confirm new password"
                              pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleFormInputChange} required />
                           <input type="submit" value="Submit reset" />
                        </form>
                        :
                        <div>
                           {emailSent === true ?
                              <form onSubmit={handleVerifyResetCode}>
                                 <input type="auth-code" id="auth-code" placeholder="reset code" onChange={handleFormInputChange} required />
                                 <input type="submit" value="Submit code" />
                              </form>
                              :
                              <form onSubmit={handleGetResetCode}>
                                 <input type="email" id="email" placeholder="email" pattern="^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@nau.edu$" onChange={handleFormInputChange} required />
                                 <input type="submit" value="Get reset code" />
                              </form>
                           }
                        </div>
                     }
                  </div>
               }
            </div>
         </div>
      </div>
   )
}

export default AuthForgot;