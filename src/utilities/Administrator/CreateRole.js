
// imports
import axios from 'axios'

/** 
* Utility Function: CreateRole
* 
* Creates role in the database
*/
const CreateRole = async (baseURL, userToken, role_name, is_admin, can_view_raw) => {

   // endpoint URL
   const createRoleEndpoint = `${baseURL}:5000/api/auth/roles`;

   const data = {
      role_name: role_name,
      is_admin: is_admin,
      can_view_raw: can_view_raw
   };

   const headers = {
      Authorization: `Bearer ${userToken}`
   }

   return axios({
      method: 'post',
      url: createRoleEndpoint,
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

export default CreateRole;