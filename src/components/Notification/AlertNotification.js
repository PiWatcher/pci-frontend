
// page imports
import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


/** 
* Component: AlertNotification
* 
* Notification component to display alerts without dialog
*/
const AlertNotification = (props) => {

   const { showAlert, setShowAlert, title, description } = props;

   // Material UI theme
   const alertTheme = createMuiTheme({
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


   /** 
   * Return: AlertNotification JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div>
         <MuiThemeProvider theme={alertTheme}>
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
                     Close
                        </Button>
               </DialogActions>
            </Dialog>
         </MuiThemeProvider >
      </div >
   );
}

export default AlertNotification;
