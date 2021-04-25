
// imports
import axios from 'axios'

/** 
* Utility Function: UserSignUp
* 
* Signs up the user with their account information
*/
const UserSignUp = async (baseURL, name, email, password) => {

   const userSignUpEndpoint = `${baseURL}:5000/api/auth/signup`;

   const data = {
      email: email,
      password: password,
      full_name: name
   };

   return axios({
      method: 'post',
      url: userSignUpEndpoint,
      data: data
   })
      .then(response => response)
      .catch(error => {

         let errorMessage;

         if (error.response) {

            errorMessage = new Error(`Error Code: ${error.response.data.status}, Message: ${error.response.data.message}`)

            // request was made and server responded
            console.error(error.response);

         } else if (error.request) {

            errorMessage = new Error('Failed to connect to server.')

            // request was made but no response was received
            console.error(error.request);
         } else {

            errorMessage = new Error('Failed to create request.')

            // error occurred when creating the request
            console.error('Error: ', error.message);
         }

         return errorMessage;
      });
};

export default UserSignUp;