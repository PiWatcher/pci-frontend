
// styling
import "./Role.css"

// page imports
import React, { useState, useContext } from 'react';
import axios from 'axios';
import _ from 'lodash'
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { unstable_createMuiStrictModeTheme as createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import DialogNotification from '../Notifications/DialogNotification';

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

// component for handling each user
const Role = (props) => {

    // consume props from parent component
    const { name, isAdmin, canViewRaw } = props;

    // consumes contexts
    const { baseURL } = useContext(DataContext);
    const { userToken } = useContext(AuthContext);

    const [showAlert, setShowAlert] = useState(false);

    const [alertConfirmed, setAlertConfirmed] = useState(false);

    // state for role permissions
    const [newRolePermissions, setNewRolePermissions] = useState({ isAdmin: false, canViewRaw: false });

    const { localIsAdmin, localCanViewRaw } = newRolePermissions;

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
        },
    });

    // open role menu
    const handleRoleDelete = (e) => {

        console.log(alertConfirmed);

        setShowAlert(true);

        console.log(alertConfirmed);

        if (alertConfirmed === true) {

            //delete user
            alert(`${name} role deleted`);

            //repull users
        }
    };

    // sets role permissions from checkbox
    const handleCheck = (e) => {
        setNewRolePermissions({ ...newRolePermissions, [e.target.name]: e.target.checked });
    }

    // returns user list item component
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
                                    disabled control={<Checkbox color="primary" checked={isAdmin} onChange={handleCheck} name="isAdmin" />}
                                    label="Admin"
                                />
                                <FormControlLabel
                                    disabled control={<Checkbox color="primary" checked={canViewRaw} onChange={handleCheck} name="canViewRaw" />}
                                    label="Raw Data"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>


                    <div className="role-delete">
                        <IconButton className="delete-button" aria-label="delete" onClick={handleRoleDelete} >
                            <CloseIcon color="secondary" />
                        </IconButton>

                        {showAlert === true ?
                            <DialogNotification setAlertConfirmed={setAlertConfirmed} showAlert={showAlert} title='Delete role?' description={`Delete ${name} role?`} />
                            :
                            null
                        }

                    </div>

                </MuiThemeProvider>

            </div>
        </li>
    );
}

export default Role;
