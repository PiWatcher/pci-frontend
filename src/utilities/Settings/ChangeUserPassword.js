
// imports
import axios from 'axios'

/** 
* Utility Function: ChangeUserPassword
* 
* Updates the password of the designated account
*
* @param {string} baseURL
* @param {string} userToken
* @param {string} password
* @param {string} new_password
*/
const ChangeUserPassword = async (baseURL, userToken, password, new_password) => {

   const changeUserPasswordEndpoint = `${baseURL}:5000/api/auth/users/update/password`;

   const data = {
      password: password,
      new_password: new_password
   };

   const headers = {
      Authorization: `Bearer ${userToken}`
   }

   return axios({
      method: 'post',
      url: changeUserPasswordEndpoint,
      headers: headers,
      data: data
   })
      .then(response => {
         console.log(response)
         return response;
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

export default ChangeUserPassword;