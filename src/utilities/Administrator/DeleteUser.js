
// imports
import axios from 'axios'

/** 
* Utility Function: DeleteUser
* 
* Deletes the designated user in the database
*
* @param {string} baseURL
* @param {string} userToken
* @param {string} email
*/
const DeleteUser = async (baseURL, userToken, email) => {

   // endpoint URL
   const deleteUserEndpoint = `${baseURL}:5000/api/auth/users`;

   const data = {
      email: email
   };

   const headers = {
      Authorization: `Bearer ${userToken}`
   }

   return axios({
      method: 'delete',
      url: deleteUserEndpoint,
      headers: headers,
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

export default DeleteUser;