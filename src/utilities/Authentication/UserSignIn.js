
// imports
import axios from 'axios'

/** 
* Utility Function: UserSignIn
* 
* Signs in the user with their account information
*/
const UserSignIn = async (baseURL, email, password) => {

   const userSignInEndpoint = `${baseURL}:5000/api/auth/signin`;

   const data = {
      email: email,
      password: password
   };

   return axios({
      method: 'post',
      url: userSignInEndpoint,
      data: data
   })
      .then(response => {
         return response
      })
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

export default UserSignIn;