import axios from 'axios'

 // delete user role from database
  const PullRoles = async (baseURL, userToken) => {

    // endpoint URL
    const pullUsersEndpoint = `${baseURL}:5000/api/auth/roles`;

    const headers = {
        Authorization: `Bearer ${userToken}`
    }
    
    return axios({
        method: 'get',
        url: pullUsersEndpoint,
        headers: headers
    })
    .then(response => response)
    .catch(error => {

        if (error.response) {

            console.error(error.response);

        } else if (error.request) {

            console.error(error.request);

        } else {

            console.error("Failure to pull roles.");
        }

        return false;
    });
};

export default PullRoles;