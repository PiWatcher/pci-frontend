
// styling
import './Auth.css';

// page imports
import React, { useContext, useState } from 'react';
import nauLogo from '../../images/nauLogoLogin.svg';


// components
import { Link } from 'react-router-dom';
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';


/** 
  * Component: Auth
  * 
  *  Takes user input and handles user sign in, user sign up, and links to auth forgot component
  */
const Auth = () => {

   const { handleUserSignIn, handleUserSignUp } = useContext(AuthenticationContext);

   const [localUserName, setLocalUserName] = useState('');

   const [localEmail, setLocalEmail] = useState('');

   const [localPassword, setLocalPassword] = useState('');

   const [localSelectedAuth, setLocalSelectedAuth] = useState("Sign In");

   const [signUpStatus, setSignUpStatus] = useState(false);

   const [showAlert, setShowAlert] = useState(false);

   const [alertType, setAlertType] = useState('');

   const [alertMessage, setAlertMessage] = useState('');


   /** 
   * Function: handleFormInputChange
   * 
   *  Sets user text input to state
   */
   const handleFormInputChange = (e) => {
      if (e.target.id === "name") {
         setLocalUserName(e.target.value);
      }

      else if (e.target.id === "email") {
         setLocalEmail(e.target.value.toLowerCase());
      }

      else if (e.target.id === "password") {
         setLocalPassword(e.target.value);
      }
   };


   /** 
   * Function: handleFormSubmit
   * 
   *  If sign in, uses handleUserSignIn from auth context to authenticate user credentials. 
   *     If failure, the user is displayed an error.
   * 
   *  If sign up, uses handleUserSignUp from auth context to create the user account in the backend database.  
   *     The user is displayed a notification on success or failure.
   */
   const handleFormSubmit = async (e) => {

      // prevent page refresh after submit
      e.preventDefault();

      // authenticates account 
      if (localSelectedAuth === "Sign In") {

         const result = await handleUserSignIn(localEmail, localPassword);

         // if error is returned
         if (result instanceof Error) {

            setAlertType('sign-in-failure');

            setAlertMessage(result.message)

            setShowAlert(true);
         }
      }

      // creates user in database
      else if (localSelectedAuth === "Sign Up") {

         const result = await handleUserSignUp(localUserName, localEmail, localPassword);

         if (result instanceof Error) {

            setAlertType('sign-up-failure')

            setAlertMessage(result.message)

            setShowAlert(true);

         } else {

            setSignUpStatus(true);
         }
      };
   }


   /** 
   * Function: selectSignIn
   * 
   *  Sets sign in auth type to state and adjusts CSS to match
   */
   const selectSignIn = () => {

      // sets auth choice to sign in
      setLocalSelectedAuth("Sign In");

      // sets css for log in tab selection
      let signIn = document.getElementById("sign-in-id");
      let signUp = document.getElementById("sign-up-id");

      // swaps active classes
      if (signUp.classList.contains("activeLoginType")) {

         signUp.classList.remove("activeLoginType");
         signUp.classList.add("nonActiveLoginType");

         signIn.classList.remove("nonActiveLoginType");
         signIn.classList.add("activeLoginType");
      }
   };


   /** 
  * Function: selectSignUp
  * 
  *  Sets sign up auth type to state and adjusts CSS to match
  */
   const selectSignUp = () => {

      // sets auth choice to sign up
      setLocalSelectedAuth("Sign Up");

      // sets css for sign up tab selection
      let signIn = document.getElementById("sign-in-id");
      let signUp = document.getElementById("sign-up-id");

      // swaps active classes
      if (signIn.classList.contains("activeLoginType")) {

         signIn.classList.remove("activeLoginType");
         signIn.classList.add("nonActiveLoginType");

         signUp.classList.remove("nonActiveLoginType");
         signUp.classList.add("activeLoginType");
      }
   };


   /** 
   * Return: Auth JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div className="login fadeInDown">
         <div className="wrapper">
            <img src={nauLogo} className="fadeIn first" alt="NAU Logo" />

            <div className="auth-functions fadeIn second">
               <div className="sign-in">
                  <h2 id="sign-in-id" className="activeLoginType" onClick={() => selectSignIn()}> Sign In </h2>
               </div>
               <div className="sign-up">
                  <h2 id="sign-up-id" className="nonActiveLoginType" onClick={() => selectSignUp()}> Sign Up </h2>
               </div>
            </div>

            {
               // ternary for selecting log in or sign up forms
               localSelectedAuth === "Sign In" ?

                  <div className="sign-in-form fadeIn third">
                     {
                        <form onSubmit={handleFormSubmit}>
                           <input type="hidden" />
                           <input type="login" id="email" placeholder="email" onChange={handleFormInputChange} required />
                           <input type="password" id="password" placeholder="password" onChange={handleFormInputChange} required />
                           <input type="submit" value="Sign In" />
                        </form>
                     }
                     <div className="forgot-password-div">
                        <Link to="/auth" className="forgot-password-link">
                           Forgot password?
                        </Link>
                     </div>
                  </div>

                  :

                  <div className="sign-up-form fadeIn third" id="upForm">
                     {
                        // ternary for displaying successful sign up
                        signUpStatus === false ?

                           <form onSubmit={handleFormSubmit}>
                              <input type="name" id="name" placeholder="full name" pattern="^[A-Z][a-z]* [A-Z][a-z]*( [A-Z])?"
                                 onChange={handleFormInputChange} required />
                              <input type="login" id="email" placeholder="email"
                                 pattern="^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@nau.edu$" onChange={handleFormInputChange} required />
                              <input type="password" id="password" placeholder="password"
                                 pattern="^(?![a-z]*$)(?![A-Z]*$)(?!\d*$)(?!\p{P}*$)(?![^a-zA-Z\d\p{P}]*$).{6,}$" onChange={handleFormInputChange} required />
                              {/* <p>Password must include at least two types of characters and be six characters long.</p> */}
                              <input type="submit" value="Sign Up" />
                           </form>

                           :

                           <div className="sign-up-success">
                              Sign up success!
                                </div>
                     }
                  </div>
            }
         </div>

         {alertType === "sign-in-failure" ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Sign In Failure`}
               description={alertMessage} />
            :
            null}


         {alertType === "sign-up-failure" ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Sign Up Failure`}
               description={alertMessage} />
            :
            null}
      </div>
   )
}

export default Auth;