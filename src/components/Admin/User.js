
// styling
import "./User.css"

// page imports
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { unstable_createMuiStrictModeTheme as createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash'
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// components
import AlertNotification from '../Notification/AlertNotification';
import ConfirmNotification from '../Notification/ConfirmNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// role information component
const User = (props) => {

    // consume props from parent component
    const { name, email, role, roles, pullUsers } = props;

    // consumes contexts
    const { baseURL, userToken } = useContext(AuthContext);

    // user role in state
    const [userRole, setUserRole] = useState(role);

    // Material UI menu state
    const [anchorEl, setAnchorEl] = useState(null);

    // alert state
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    // alert state
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);

    // role update alert state
    const [userUpdateAlert, setUserUpdateAlert] = useState('');

    // custom material theme
    const roleButtonTheme = createMuiTheme({
        typography: {
            fontFamily: 'Open Sans',
            fontSize: 16
        },
        props: {
            MuiButton: {
                disableRipple: true,
            },
            MuiMenuItem: {
                disableRipple: true,
            }
        }
    });

    // API logic for updating user role
    const updateRole = async (role) => {

        // endpoint URL
        const roleUpdateEndpoint = `${baseURL}:5000/api/auth/users/update`

        // tries to update user information
        try {
            const response = await axios({
                method: 'post',
                url: roleUpdateEndpoint,
                params: {
                    jwt_token: userToken
                },
                data: {
                    email: email,
                    new_role: role
                }
            });

            // successfully connected to endpoint and updated user
            if (response.status === 200) {

                setUserRole(response.data.user['role']);

                setShowUpdateAlert(true);

                setUserUpdateAlert('success');
            }
        }

        // caught failure
        catch (error) {

            setShowUpdateAlert(true);

            setUserUpdateAlert('failure');

            // display error in console for debugging
            console.error('Error', error.response);
        }
    };

    // open role menu
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    // close role menu
    const handleClose = (e) => {

        let newRole = e.currentTarget.textContent;

        // checks if role has been selected
        if (newRole !== '') {

            // update user role in database
            updateRole(newRole);
        }

        // close menu
        setAnchorEl(null);
    };

    // open role menu
    const deleteUser = async () => {


        alert(`success`)
        // const deleteRoleEndpoint = `${baseURL}:5000/api/auth/`;

        // // tries to delete role
        // try {
        //     const response = await axios({
        //         method: 'post',
        //         url: deleteRoleEndpoint,
        //         params: {
        //             name: name,
        //             jwt_token: userToken
        //         }
        //     });

        //     // successfully connected to endpoint and delete role
        //     if (response.status === 200) {

        //         setStatusAlert(true);

        //     }
        // }

        // // failed to pull chart data
        // catch (error) {
        //     console.error('Error', error.response);
        //     setShowAlert(true);
        // }

        setShowDeleteAlert(false);

        pullUsers();
    };

    // returns user list item component
    return (
        <li>
            <div className="user-list-option">
                <div className="user-info">
                    <div className="user-name">
                        {name}
                    </div>
                    <div className="user-email">
                        {email}
                    </div>
                </div>

                <MuiThemeProvider theme={roleButtonTheme}>

                    <div className="user-role">


                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            {userRole}
                        </Button>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >

                            {/* mapping list of roles to menu selection options */}
                            {_.map(roles, item => <MenuItem key={item.role_name} onClick={handleClose}>{item.role_name}</MenuItem>)}

                        </Menu>


                    </div>

                    <div className="user-delete">
                        <IconButton className="delete-button" aria-label="delete" onClick={() => setShowDeleteAlert(true)} >
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </div>

                </MuiThemeProvider>

                <ConfirmNotification showAlert={showDeleteAlert} setShowAlert={setShowDeleteAlert} onConfirm={deleteUser} title={'User Delete'}
                    description={`Are you sure you want to delete the account for ${name}?`} />


                {showUpdateAlert === true && userUpdateAlert === 'success' ?
                    <AlertNotification showAlert={showUpdateAlert} setShowAlert={setShowUpdateAlert} title={'User Role Update'}
                        description={`${name} successfully updated to "${userRole}" role.`} />
                    :
                    null}

                {showUpdateAlert === true && userUpdateAlert === 'failure' ?
                    <AlertNotification showAlert={showUpdateAlert} setShowAlert={setShowUpdateAlert} title={'User Role Update'}
                        description={`${name} failed to update to role.`} />
                    :
                    null}

            </div>
        </li>
    );
}

export default User;
