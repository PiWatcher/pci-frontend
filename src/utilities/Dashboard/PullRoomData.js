
// imports
import axios from 'axios'

/** 
* Utility Function: PullRoomData
* 
* Pulls the associated data of the designated building's room from the database
*
* @param {string} baseURL
* @param {string} building
* @param {string} room
* @param {string} currentQuery
*/
const PullRoomData = async (baseURL, building, room, currentQuery) => {

   const pullRoomDataEndpoint = `${baseURL}:5000/api/data/building/room/${currentQuery}`

   const params = {
      building_name: building,
      room: room
   };

   return axios({
      method: 'get',
      url: pullRoomDataEndpoint,
      params: params
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

export default PullRoomData;