
// page imports
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// component for selection alerts
const ConfirmNotification = (props) => {

    // consume props from parent component
    const { showAlert, setShowAlert, onConfirm, title, description } = props;

    // custom material theme
    const confirmTheme = createMuiTheme({
        typography: {
            fontFamily: 'Open Sans',
            fontSize: 16
        },
        props: {
            MuiButton: {
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

    // returns a confirmation dialog
    return (
        <div>
            <MuiThemeProvider theme={confirmTheme}>
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
                    <DialogTitle className="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText className="alert-dialog-description">
                            {description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowAlert(false)}>
                            Cancel
                            </Button>
                        <Button onClick={() => onConfirm()} autoFocus>
                            Confirm
                            </Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider >
        </div >
    );
}

export default ConfirmNotification;
