
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// components
import ConfirmNotification from '../Notification/ConfirmNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// user information component
const Role = (props) => {

    // consume props from parent component
    const { name, isAdmin, canViewRaw, pullRoles } = props;

    // consumes context
    const { userToken, baseURL } = useContext(AuthContext);

    // alert state
    const [showAlert, setShowAlert] = useState(false);

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

        alert(`success`)

        // close confirmation dialog
        setShowAlert(false);


        // const deleteRoleEndpoint = `${baseURL}:5000/api/auth/`;

        // // tries to delete role
        // try {
        //     const response = await axios({
        //         method: 'post',
        //         url: deleteRoleEndpoint,
        //         params: {
        //             name: name,
        //             jwt_token: userToken
        //         }
        //     });

        //     // successfully connected to endpoint and delete role
        //     if (response.status === 200) {

        //         setStatusAlert(true);

        //     }
        // }

        // // failed to pull chart data
        // catch (error) {
        //     console.error('Error', error.response);
        //     setStatusAlert(false);
        // }

        // repull list of roles
        pullRoles();
    };

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
                        <IconButton className="delete-button" aria-label="delete" onClick={() => setShowAlert(true)} >
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </div>

                </MuiThemeProvider>

                <ConfirmNotification showAlert={showAlert} setShowAlert={setShowAlert} onConfirm={deleteRole} title={'Role Delete'}
                    description={`Are you sure you want to delete the "${name}" role?`} />
            </div>
        </li>
    );
}

export default Role;
