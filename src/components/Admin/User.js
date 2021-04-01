
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

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

// component for handling each user
const User = (props) => {

    // consume props from parent component
    const { name, email, role, roles } = props;

    // consumes contexts
    const { baseURL } = useContext(DataContext);
    const { userToken } = useContext(AuthContext);

    // user role in state
    const [userRole, setUserRole] = useState(role);

    // Material UI menu state
    const [anchorEl, setAnchorEl] = useState(null);

    const [alertStatus, setAlertStatus] = useState(false);

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
                alert(`${name} was updated to the role of ${role}.`)
            }
        }

        // caught failure
        catch (error) {
            alert(error.response.data['description'])
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
    const handleUserDelete = (e) => {
        alert(`${name} has been deleted as a user.`);

        //check with alert

        //if yes, delete with delete function
        // repull users

        //if no, 
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
                        <IconButton className="delete-button" aria-label="delete" onClick={handleUserDelete} >
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </div>

                </MuiThemeProvider>

            </div>
        </li>
    );
}

export default User;
