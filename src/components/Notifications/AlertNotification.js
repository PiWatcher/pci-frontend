

// page imports
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import _ from 'lodash'

// component for handling each user
const AlertNotification = (props) => {

    // consume props from parent component
    const { showAlert, title, description } = props;

    const [open, setOpen] = useState(showAlert);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);

        return true;
    }

    const handleDeny = () => {
        setOpen(false);

        return false;
    }


    // // open role menu
    // const handleAlertConfirm = (e) => {
    //     alert(`${name} has been deleted as a role.`);

    //     //check with alert

    //     //if yes, delete with delete function
    //     // repull users

    //     //if no, 
    // };

    // const handleAlertDeny = (e) => {
    //     alert(`${name} has been deleted as a role.`);

    //     //check with alert

    //     //if yes, delete with delete function
    //     // repull users

    //     //if no, 
    // };

    // returns user list item component
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        borderRadius: 8,
                        boxShadow: 1,
                        maxWidth: 'xl',
                        fullWidth: true
                    }
                }
                }
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeny} color="primary">
                        Deny
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertNotification;
