
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
import axios from 'axios';

// components
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// create new user role component
const RoleCreation = (props) => {

    // consume context
    const { userToken, baseURL } = useContext(AuthContext);

    // consume props from parent component
    const { pullRoles } = props;

    // state for new role name
    const [newRoleName, setNewRoleName] = useState('');

    // state for new role permissions
    const [newRolePermissions, setNewRolePermissions] = useState({ isAdmin: false, canViewRaw: false });
    const { isAdmin, canViewRaw } = newRolePermissions;

    // state for alert
    const [showAlert, setShowAlert] = useState('');

    // state for alert type
    const [alertType, setAlertType] = useState('');

    // custom material theme
    const checkBoxTheme = createMuiTheme({
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

    // pulls role name from text input
    const formHandler = (e) => {
        if (e.target.id === "roleNameForm") {
            setNewRoleName(e.target.value);
        }
    }

    // sets role permissions from checkboxes
    const handleCheck = (e) => {
        setNewRolePermissions({ ...newRolePermissions, [e.target.name]: e.target.checked });
    }

    // creates role in database
    const submitNewRole = async (e) => {

        e.preventDefault();

        // endpoint URL
        const roleCreationEndpoint = `${baseURL}:5000/api/auth/roles`;

        // tries to submit new role
        if (newRoleName !== '') {
            try {
                const response = await axios({
                    method: 'post',
                    url: roleCreationEndpoint,
                    params: {
                        jwt_token: userToken
                    },
                    data: {
                        role_name: newRoleName.toLowerCase(),
                        is_admin: isAdmin,
                        can_view_raw: canViewRaw
                    }
                });

                // successfully connected to endpoint and created role
                if (response.status === 200) {

                    // repull list of roles
                    pullRoles();

                    // set alert type
                    setAlertType('success');

                    // show alert
                    setShowAlert(true);
                }
            }

            // failed to create new role
            catch (error) {

                // set alert type
                setAlertType('failure');

                // show alert
                setShowAlert(true);

                // display error in console for debugging
                console.error('Error', error.response);
            }
        }
    };

    return (
        <div className="role-creation-component">
            <p>Role Creation</p>
            <input type="text" id="roleNameForm" onChange={formHandler} placeholder="New role name" value={newRoleName} />
            <div className="checkbox-div-creation">
                <MuiThemeProvider theme={checkBoxTheme}>
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
                </MuiThemeProvider>
                <form onSubmit={submitNewRole}>
                    <input type="submit" value="Submit new role" />
                </form>
            </div>

            {showAlert === true && alertType == 'success' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Role Creation Status`}
                    description={`Creation of role "${newRoleName}" successful.`} />
                :
                null}

            {showAlert === true && alertType === 'failure' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Role Creation Status'}
                    description={`Creation of role "${newRoleName}" failed.`} />
                :
                null}
        </div>
    )
}

export default RoleCreation;
