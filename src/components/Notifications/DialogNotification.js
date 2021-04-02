

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
    const { deleteRole, showAlert, setShowAlert, title, description } = props;

    const [promiseInfo, setPromiseInfo] = useState({});


    const handleConfirm = () => {

        //deleteRole();

        setShowAlert(false);

        console.log(showAlert)
    }

    // returns user list item component
    return (
        <div>
            <Dialog
                open={showAlert}
                onClose={() => setShowAlert(false)}
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
                    <Button onClick={setShowAlert(false)} color="primary">
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
