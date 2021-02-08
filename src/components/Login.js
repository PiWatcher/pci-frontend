
// styling
import './Login.css';

// page imports
import React, { useContext, useState } from 'react';
import nauLogo from '../images/nauLogo.svg';


// contexts
import { AuthContext } from '../contexts/AuthContext';


const Login = () => {

   // consume data from AuthContext
   const { setEmail, setPassword, setAuthStatus } = useContext(AuthContext);

   // local variable for user email during text input
   const [localEmail, setLocalEmail] = useState('');

   // local variable for user password during text input
   const [localPassword, setLocalPassword] = useState('');


   // places user form input into local temp variables
   const handleInputChange = (e) => {
      if (e.target.id === "login") {
         setLocalEmail(e.target.value);

      }

      else if (e.target.id === "password") {
         setLocalPassword(e.target.value);
      }
   }


   // passes temp variables to AuthContext state after submit
   const handleSubmit = (e) => {
      e.preventDefault();

      console.log(localEmail);
      console.log(localPassword);

      setEmail(localEmail);
      setPassword(localPassword);
      setAuthStatus(true);

   }


   // returns the login page with input form
   return (
      <div className="Login">
         <div className="wrapper fadeInDown">
            <div className="fadeIn first">
               <img src={nauLogo} id="icon" alt="NAU Logo" />
            </div>

            <form onSubmit={handleSubmit}>
               <input type="login" id="login" className="fadeIn second" placeholder="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={handleInputChange} required />
               <input type="password" id="password" className="fadeIn third" placeholder="password" onChange={handleInputChange} required />
               <input type="submit" className="fadeIn fourth" value="Log In" />
            </form>
         </div>
      </div>
   )
}

export default Login;