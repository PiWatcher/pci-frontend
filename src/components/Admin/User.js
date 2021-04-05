
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertNotification from '../Notification/AlertNotification';


// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

// component for handling each user
const User = (props) => {

    // consume props from parent component
    const { name, email, role, roles, pullUsers } = props;

    // consumes contexts
    const { baseURL } = useContext(DataContext);
    const { userToken } = useContext(AuthContext);

    // user role in state
    const [userRole, setUserRole] = useState(role);

    // Material UI menu state
    const [anchorEl, setAnchorEl] = useState(null);

    const [showAlert, setShowAlert] = useState(false);

    const [userUpdateAlert, setUserUpdateAlert] = useState(false);

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
                setShowAlert(true);

                setUserUpdateAlert('success');
            }
        }

        // caught failure
        catch (error) {

            setShowAlert(true);

            setUserUpdateAlert('failure');

            console.log(error.response.data['description'])
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

            // set role for user
            setUserRole(newRole);

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
                        <IconButton className="delete-button" aria-label="delete" onClick={() => setShowAlert(true)} >
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </div>

                    <Dialog
                        open={showAlert}
                        onClose={() => setShowAlert(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth='sm'
                        fullWidth={true}
                        PaperProps={{
                            style: {
                                borderRadius: 8,
                                boxShadow: 1,
                                display: 'flex',
                                alignItems: "center"
                            }
                        }}
                    >
                        <DialogTitle className="alert-dialog-title">{`Delete User`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText className="alert-dialog-description">
                                {`Are you sure you want to delete "${name}"?`}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowAlert(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => deleteUser()} color="primary" autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>

                </MuiThemeProvider>


                {showAlert === true && userUpdateAlert === 'success' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'User Role Update'}
                        description={`${name} successfully updated to ${role}`} />
                    :
                    null}

                {showAlert === true && userUpdateAlert === 'failure' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
                        description={`${name} failed to update to role of ${role}`} />
                    :
                    null}

            </div>
        </li>
    );
}

export default User;
