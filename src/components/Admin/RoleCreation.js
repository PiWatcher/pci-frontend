// styling
import './RoleCreation.css';

// page imports
import React, { useState, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import { unstable_createMuiStrictModeTheme as createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

// contexts
import { AuthContext } from '../../contexts/AuthContext';



const RoleCreation = (props) => {

    const { userToken, baseURL } = useContext(AuthContext);

    const [newRoleName, setNewRoleName] = useState('');

    const [newRolePermissions, setNewRolePermissions] = useState({ isAdmin: false, canViewRaw: false });

    const [roleCreationStatus, setRoleCreationStatus] = useState(null);

    const { isAdmin, canViewRaw } = newRolePermissions;

    // pulls search text for processing
    const formHandler = (e) => {
        if (e.target.id === "roleNameForm") {
            setNewRoleName(e.target.value);
        }
    }

    // pulls search text for processing
    const handleCheck = (e) => {
        setNewRolePermissions({ ...newRolePermissions, [e.target.name]: e.target.checked });
    }

    // custom material theme for buttons
    const queryButtonTheme = createMuiTheme({
        typography: {
            fontFamily: 'Open Sans',
            fontSize: 16
        },
        props: {
            MuiCheckbox: {
                disableRipple: true
            },
        },
        palette: {
            primary: {
                main: '#003466'
            }
        },
    });

    // API pull logic for available user roles
    const submitNewRole = async () => {


        // tries to submit new role
        if (newRoleName !== '') {
            try {
                const response = await axios({
                    method: 'post',
                    url: `${baseURL}:5000/api/auth/roles`,
                    params: {
                        jwt_token: userToken
                    },
                    data: {
                        role_name: newRoleName.toLowerCase(),
                        is_admin: isAdmin,
                        can_view_raw: canViewRaw
                    }
                });

                // successfully connected to endpoint and pulled data
                if (response.status === 200) {
                    setRoleCreationStatus(true);
                }
            }

            // failed to pull roles
            catch {
                setRoleCreationStatus(true);
                console.log("Failed to create new user role.")
            }
        }

    };


    // returns parsed rooms in unordered list
    return (
        <div className="role-creation-component">
            <p>Role Creation</p>
            <input type="text" id="roleNameForm" onChange={formHandler} placeholder="New role name" value={newRoleName} />
            <div className="checkbox-div">
                <MuiThemeProvider theme={queryButtonTheme}>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={isAdmin} onChange={handleCheck} name="isAdmin" />}
                                label="Admin privileges"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={canViewRaw} onChange={handleCheck} name="canViewRaw" />}
                                label="Ability to view raw data"
                            />
                        </FormGroup>
                    </FormControl>
                    <div className="role-submit-button">
                        <Button variant="contained" color="primary"
                            onClick={() => submitNewRole()}>
                            Submit new role
                        </Button>
                    </div>
                </MuiThemeProvider>
            </div>

            <div className="role-status-messages">
                {
                    // ternary for displaying failed sign up (based on failed connection to endpoint)
                    roleCreationStatus === true ?
                        `${newRoleName} has been created successfully.`
                        :
                        null
                }
                {
                    // ternary for displaying failed sign up (based on failed connection to endpoint)
                    roleCreationStatus === false ?
                        `Failed to create new role.`
                        :
                        null
                }
            </div>

        </div>
    )
}

export default RoleCreation;
