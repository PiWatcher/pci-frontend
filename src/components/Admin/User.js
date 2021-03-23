// styling
import "./User.css"

// page imports
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// contexts
import { DataContext } from '../../contexts/DataContext';

const User = (props) => {

    // consume props from parent component
    const { name, email, role, roles, pullUsers } = props;

    // consumes data from DataContext
    const { baseURL } = useContext(DataContext);

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
    const updateRole = async () => {

        // tries to update user information
        try {
            const response = await axios({
                method: 'post',
                url: `${baseURL}:5000/api/auth/users/update`,
                params: {
                    jwt_token: 'dummy_token'
                },
                data: {
                    user_email: email,
                    new_role: userRole
                }
            });

            // successfully connected to endpoint and updated user
            if (response.status === 200) {

                console.log("Successfully updated user role.")

                // pull all users again for latest list
                pullUsers();
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
    };

    const handleClose = (e) => {

        let newRole = e.currentTarget.textContent;

        if (newRole !== '') {

            // set role for user
            setUserRole(newRole);

            // send updated role to database 
            updateRole();
        }

        // close menu
        setAnchorEl(null);
    };

    const menuItems = roles.map((item) => {
        return (
            <MenuItem onClick={handleClose}>{item.role_name}</MenuItem>
        );
    });

    return (
        <div>
            <li key={email}>
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
                                {menuItems}
                            </Menu>
                        </MuiThemeProvider>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default User;
