

// page imports
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import _ from 'lodash'

// component for handling each user
const DialogNotification = (props) => {

    // consume props from parent component
    const { setAlertConfirmed, showAlert, title, description } = props;

    const [open, setOpen] = useState(showAlert);

    const [promiseInfo, setPromiseInfo] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {

        setOpen(false);

        return Promise.resolve();
    }

    const handleDeny = () => {

        setOpen(false);

        return Promise.reject();
    }

    const showDialog = async () => {
        return new Promise((resolve, reject) => {
            setPromiseInfo({ resolve, reject });
            setOpen(true);
        });
    };


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

    useEffect(() => {
        setTimeout(function () { }, 10000);
        setOpen(false);
    }, [])

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
                }}
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

export default DialogNotification;
