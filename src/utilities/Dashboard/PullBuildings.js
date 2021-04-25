
// imports
import axios from 'axios'

/** 
* Utility Function: PullBuildings
* 
* Pulls all buildings within the database
*/
const PullBuildings = async (baseURL) => {

   const pullBuildingsEndpoint = `${baseURL}:5000/api/data/buildings`;

   return axios({
      method: 'get',
      url: pullBuildingsEndpoint
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

export default PullBuildings;