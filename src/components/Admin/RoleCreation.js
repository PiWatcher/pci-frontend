
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
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// component for creating new user roles
const RoleCreation = (props) => {

    // consume context
    const { userToken, baseURL } = useContext(AuthContext);

    // consume props from parent component
    const { pullRoles } = props;

    // state for new role
    const [newRoleName, setNewRoleName] = useState('');

    // state for role permissions
    const [newRolePermissions, setNewRolePermissions] = useState({ isAdmin: false, canViewRaw: false });

    const { isAdmin, canViewRaw } = newRolePermissions;

    // state for new role
    const [showAlert, setShowAlert] = useState('');

    // state for new role
    const [alertType, setAlertType] = useState('');

    // pulls role name text
    const formHandler = (e) => {
        if (e.target.id === "roleNameForm") {
            setNewRoleName(e.target.value);
        }
    }

    // sets role permissions from checkbox
    const handleCheck = (e) => {
        setNewRolePermissions({ ...newRolePermissions, [e.target.name]: e.target.checked });
    }

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

    // API submit logic for role creation
    const submitNewRole = async () => {

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

                    pullRoles();

                    setAlertType('success');

                    setShowAlert(true);
                }
            }

            // failed to create new role
            catch (error) {
                setAlertType('failure');

                setShowAlert(true);
            }
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
                    <div className="role-submit-button">
                        <Button variant="contained" color="primary"
                            onClick={() => submitNewRole()}>
                            Submit new role
                        </Button>
                    </div>
                </MuiThemeProvider>
            </div>

            {showAlert === true ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
                    description={`Role creation ${alertType}`} />
                :
                null}
        </div>
    )
}

export default RoleCreation;
