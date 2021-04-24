import axios from 'axios'

 // delete user role from database
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

        if (error.response) {

            console.error(error.response);

        } else if (error.request) {

            console.error(error.request);

        } else {

            console.error("Failure to update user role.");
        }

        return false;
    });
};

export default UpdateUserRole;