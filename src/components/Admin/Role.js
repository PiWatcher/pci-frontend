
// styling
import "./Role.css"

// page imports
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// components
import AlertNotification from '../Notification/AlertNotification';
import ConfirmNotification from '../Notification/ConfirmNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// role information component
const Role = (props) => {

    // consume props from parent component
    const { name, isAdmin, canViewRaw, pullRoles } = props;

    // consumes context
    const { userToken, baseURL } = useContext(AuthContext);

    // alert state
    const [showDialogAlert, setShowDialogAlert] = useState(false);

    // alert state
    const [showAlert, setShowAlert] = useState(false);

    // role update alert state
    const [alertType, setAlertType] = useState('');

    // custom material theme
    const checkBoxTheme = createMuiTheme({
        typography: {
            fontFamily: 'Open Sans',
            fontSize: 16
        },
        props: {
            MuiCheckbox: {
                disableRipple: true,
                color: "primary"
            }
        },
        palette: {
            primary: {
                main: '#003466'
            }
        }
    });


    // delete user role from database
    const deleteRole = async () => {

        // close confirmation dialog
        setShowDialogAlert(false);

        const deleteRoleEndpoint = `${baseURL}:5000/api/auth/roles`;

        // tries to delete role
        try {
            const response = await axios({
                method: 'delete',
                url: deleteRoleEndpoint,
                data: {
                    role_name: name,
                    jwt_token: userToken
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


    // on successful delete of role, closes alert and repulls roles
    const deleteSuccessful = () => {

        // hide alert
        setShowAlert(false);

        // repull list of roles
        pullRoles();

    }

    // returns role list item component
    return (
        <li>
            <div className="role-list-option">
                <div className="role-info">
                    <div className="role-name">
                        {name}
                    </div>
                </div>

                <MuiThemeProvider theme={checkBoxTheme}>

                    <div className="checkbox-div">
                        <FormControl>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={isAdmin} name="isAdmin" />}
                                    label="Admin"
                                />
                                <FormControlLabel
                                    control={<Checkbox color="primary" checked={canViewRaw} name="canViewRaw" />}
                                    label="Raw Data"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>

                    <div className="role-delete">
                        <IconButton className="delete-button" aria-label="delete" onClick={() => setShowDialogAlert(true)} >
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </div>

                </MuiThemeProvider>

                <ConfirmNotification showAlert={showDialogAlert} setShowAlert={setShowDialogAlert} onConfirm={deleteRole} title={'Role Delete'}
                    description={`Are you sure you want to delete the "${name}" role?`} />

                {showAlert === true && alertType === 'delete-success' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={deleteSuccessful} title={'Role Delete Status'}
                        description={`${name} role successfully deleted.`} />
                    :
                    null}

                {showAlert === true && alertType === 'delete-failure' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Role Delete Status'}
                        description={`${name} role deletion failed.`} />
                    :
                    null}
            </div>
        </li>
    );
}

export default Role;
