import axios from 'axios'

 // delete user role from database
  const DeleteRole = async (baseURL, userToken, name) => {

    const deleteRoleEndpoint = `${baseURL}:5000/api/auth/roles`;

    const data = {
        role_name: name
    };

    const headers = {
        Authorization: `Bearer ${userToken}`
    }

    return axios({
        method: 'delete',
        url: deleteRoleEndpoint,
        headers: headers,
        data: data
    })
    .then(response => response)
    .catch(error => {

        if (error.response) {

            // request was made and server responded
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);

        } else if (error.request) {

            // request was made but no response was received
            console.log(error.request);
        } else {

            // error occurred when setting up the request
            console.log('Error', error.message);
        }

        return false;
    });
};

export default DeleteRole;