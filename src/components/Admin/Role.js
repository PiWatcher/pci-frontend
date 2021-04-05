
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

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

// component for handling each user
const Role = (props) => {

    // consume props from parent component
    const { name, isAdmin, canViewRaw, pullRoles } = props;

    // consumes contexts
    const { baseURL } = useContext(DataContext);
    const { userToken } = useContext(AuthContext);

    const [showAlert, setShowAlert] = useState(false);

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
        }
    });

    // open role menu
    const deleteRole = async () => {

        setShowAlert(false);

        alert(`success`)
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

        pullRoles();
    };

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

                    <Dialog
                        open={showAlert}
                        onClose={() => setShowAlert(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth='sm'
                        fullWidth={true}
                        PaperProps={{
                            style: {
                                borderRadius: 8,
                                boxShadow: 1,
                                display: 'flex',
                                alignItems: "center"
                            }
                        }}
                    >
                        <DialogTitle className="alert-dialog-title">{`Delete Role`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText className="alert-dialog-description">
                                {`Are you sure you want to delete "${name}" role?`}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowAlert(false)} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={() => deleteRole()} color="primary" autoFocus>
                                Confirm
                        </Button>
                        </DialogActions>
                    </Dialog>

                </MuiThemeProvider>
            </div>
        </li>
    );
}

export default Role;
