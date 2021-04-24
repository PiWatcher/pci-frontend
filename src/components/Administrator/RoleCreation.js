
// styling
import './RoleCreation.css';

// page imports
import React, { useState, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// components
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

import CreateRole from '../Utilities/Administrator/CreateRole'

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

    // state for alert type
    const [alertMessage, setAlertMessage] = useState('');

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

        // await authentication
        const result = await CreateRole(baseURL, userToken, newRoleName.toLowerCase(), isAdmin, canViewRaw);

        // if failure
        if (result instanceof Error) {

            setAlertType('create-role-failure');

            setAlertMessage(result.message)

            setShowAlert(true);
        } else {

            // repull list of roles
            pullRoles();

            // set alert type
            setAlertType('create-role-success');

            setAlertMessage(`${newRoleName} role has been created successfully.`);

            // show alert
            setShowAlert(true);
        }
    };

    // returns role creation component
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

            {showAlert === true && alertType === 'create-role-success' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`Role Creation Status`}
                    description={alertMessage} />
                :
                null}

            {showAlert === true && alertType === 'create-role-failure' ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Role Creation Status'}
                    description={alertMessage} />
                :
                null}
        </div>
    )
}

export default RoleCreation;
