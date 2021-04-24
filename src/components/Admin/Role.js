
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

//functions
import DeleteRole from '../Utilites/Admin/DeleteRole';

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

    const handleRoleDelete = async () => {

        // close confirmation dialog
        setShowDialogAlert(false);

        const result = await DeleteRole(baseURL, userToken, name);

        if(result.status === 200){

            // set alert type
            setAlertType('delete-success');
        } else {      

            // set alert type
            setAlertType('delete-failure');
        }

        // // show alert
        setShowAlert(true);

    };


    // on successful delete of role, closes alert and repulls roles
    const onDeleteSuccess = () => {

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

                    {name === 'public' || name === 'admin' ?
                    <div className="role-delete">
                    </div>
                    :
                    <div className="role-delete">
                        <IconButton className="delete-button" aria-label="delete" onClick={() => setShowDialogAlert(true)} >
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </div>
}

                </MuiThemeProvider>

                <ConfirmNotification showAlert={showDialogAlert} setShowAlert={setShowDialogAlert} onConfirm={handleRoleDelete} title={'Role Delete'}
                    description={`Are you sure you want to delete the "${name}" role?`} />

                {showAlert === true && alertType === 'delete-success' ?
                    <AlertNotification showAlert={showAlert} setShowAlert={onDeleteSuccess} title={'Role Delete Status'}
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
