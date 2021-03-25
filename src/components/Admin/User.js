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

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

const User = (props) => {

    // consume props from parent component
    const { name, email, role, roles } = props;

    // consumes data from DataContext
    const { baseURL } = useContext(DataContext);

    const { userToken } = useContext(AuthContext);

    // user role in state
    const [userRole, setUserRole] = useState(role);

    // Material UI menu state
    const [anchorEl, setAnchorEl] = useState(null);

    // custom material theme for role menu
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

    // API pull and parse logic for rooms in selected building
    const updateRole = async (role) => {

        // tries to update user information
        try {

            console.log(email);
            const response = await axios({
                method: 'post',
                url: `${baseURL}:5000/api/auth/users/update`,
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
                console.log(response);
                console.log("Successfully updated user role.")
            }
        }

        // caught failure
        catch {
            console.log("Failed to update user role.")
        }
    };

    // open role menu
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        console.log(roles);
    };

    const handleClose = (e) => {

        let newRole = e.currentTarget.textContent;

        // checks for that role has been selected
        if (newRole !== '') {

            // set role for user
            setUserRole(newRole);

            // update user role in database
            updateRole(newRole);
        }

        // close menu
        setAnchorEl(null);
    };

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

                <div className="user-role">
                    <MuiThemeProvider theme={roleButtonTheme}>
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
                    </MuiThemeProvider>
                </div>
            </div>
        </li>
    );
}

export default User;
