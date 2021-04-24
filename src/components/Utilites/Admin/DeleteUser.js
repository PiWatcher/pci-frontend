import axios from 'axios'

 // delete user role from database
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

        if (error.response) {

            console.error(error.response);

        } else if (error.request) {

            console.error(error.request);

        } else {

            console.error("Failure to delete user.");
        }

        return false;
    });
};

export default DeleteUser;