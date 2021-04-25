
// imports
import axios from 'axios'

/** 
* Utility Function: UpdateUserRole
* 
* Updates the designated user's role in the database
*/
const UpdateUserRole = async (baseURL, userToken, email, role) => {

   // endpoint URL
   const updateUserRoleEndpoint = `${baseURL}:5000/api/auth/users/update`

   const data = {
      email: email,
      new_role: role
   };

   const headers = {
      Authorization: `Bearer ${userToken}`
   }

   return axios({
      method: 'post',
      url: updateUserRoleEndpoint,
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

export default UpdateUserRole;