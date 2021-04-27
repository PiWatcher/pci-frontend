
// imports
import axios from 'axios'

/** 
* Utility Function: TokenSignIn
* 
* Signs in the user with their token
*
* @param {string} baseURL
* @param {string} cookieToken
*/
const TokenSignIn = async (baseURL, cookieToken) => {

   const tokenSignInEndpoint = `${baseURL}:5000/api/auth/token`;

   const headers = {
      'Authorization': `Bearer ${cookieToken}`
   }

   return axios({
      method: 'post',
      url: tokenSignInEndpoint,
      headers: headers
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

export default TokenSignIn;