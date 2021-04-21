
// styling
import "./User.css"

// page imports
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
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
    const { baseURL, userToken, userName } = useContext(AuthContext);

    // user role in state
    const [userRole, setUserRole] = useState(role);

    // Material UI menu state
    const [anchorEl, setAnchorEl] = useState(null);

    // alert state
    const [showDialogAlert, setShowDialogAlert] = useState(false);

    // alert state
    const [showAlert, setShowAlert] = useState(false);

    // role update alert state
    const [alertType, setAlertType] = useState('');

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
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
                data: {
                    email: email,
                    new_role: role
                }
            });

            // successfully connected to endpoint and updated user
            if (response.status === 200) {

                // display current user role
                setUserRole(response.data.user['role']);

                //show success alert
                setShowAlert(true);

                // set alert type
                setAlertType('update-success');
            }
        }

        // caught failure
        catch (error) {

            // show alert
            setShowAlert(true);

            // set alert type
            setAlertType('update-failure');

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

    // delete user role from database
    const deleteUser = async () => {

        // clear confirmation dialog
        setShowDialogAlert(false);

        const deleteUserEndpoint = `${baseURL}:5000/api/auth/users`;

        // tries to delete user
        try {

            const response = await axios({
                method: 'delete',
                url: deleteUserEndpoint,
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
                data: {
                    email: email
                }
            });

            // successfully connected to endpoint and delete role
            if (response.status === 200) {

                //show success alert
                setShowAlert(true);

                // set alert type
                setAlertType('delete-success');

            }
        }

        // failed to pull chart data
        catch (error) {

            // show alert
            setShowAlert(true);

            // set alert type
            setAlertType('delete-failure');

            // display error in console for debugging
            console.error('Error', error.response);
        }
    };

    // on successful delete of user, closes alert and repulls users
    const deleteSuccessful = () => {

        // hide alert
        setShowAlert(false);

        // repull list of users
        pullUsers();

    }

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

                    {name === 'Administrator' || name === userName ?
                    <div className="user-delete">
                    </div>
                    :
                    <div className="user-delete">
                        <IconButton className="delete-button" aria-label="delete" onClick={() => setShowDialogAlert(true)} >
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </div>
                    }

                </MuiThemeProvider>

                <ConfirmNotification showAlert={showDialogAlert} setShowAlert={setShowDialogAlert} onConfirm={deleteUser} title={'User Delete'}
                    description={`Are you sure you want to delete the account for ${name}?`} />


                {showAlert === true && alertType === 'update-success' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'User Role Update Status'}
                        description={`${name} successfully updated to "${userRole}" role.`} />
                    :
                    null}

                {showAlert === true && alertType === 'update-failure' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'User Role Update Status'}
                        description={`${name} failed to update to role.`} />
                    :
                    null}

                {showAlert === true && alertType === 'delete-success' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={deleteSuccessful} title={'User Delete Status'}
                        description={`${name} account successfully deleted.`} />
                    :
                    null}

                {showAlert === true && alertType === 'delete-failure' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'User Delete Status'}
                        description={`${name} account deletion failed.`} />
                    :
                    null}

            </div>
        </li>
    );
}

export default User;
