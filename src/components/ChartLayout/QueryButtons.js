
// styling
import './QueryButtons.css';

// page imports
import React, { useContext, useState } from 'react';

// components
import AlertNotification from '../Notification/AlertNotification';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// contexts
import { AuthenticationContext } from '../../contexts/AuthenticationContext';


/** 
* Component: QueryButtons
* 
* A singular component of a row of Material UI buttons which are used to direct data pull in the time series
*
* @param {props} props
*/
const QueryButtons = (props) => {

   const {

      // {string} current data query being sent to the back end database
      currentQuery,

      // {function} sets the current query to be sent to the back end database
      setCurrentQuery,

      // {boolean} if a query is currently in progress
      loading

   } = props;

   // {boolean} if the user has admin privileges
   const { userAdminPermissions } = useContext(AuthenticationContext);

   // {boolean} if an alert is to be shown
   const [showAlert, setShowAlert] = useState(false);

   // {string} message to be shown in alert
   const [alertMessage, setAlertMessage] = useState('');

   // Material UI theme
   const queryButtonTheme = createMuiTheme({
      typography: {
         fontFamily: 'Open Sans',
         fontSize: 16
      },
      props: {
         MuiButton: {
            disableRipple: true
         }
      },
      palette: {
         primary: {
            main: '#003466'
         }
      },
   });


   /** 
   * Function: checkQueryInProgress
   *
   * Adjust back end database query based on button selection
   * 
   * @param {string} newQuery
   */
   const checkQueryInProgress = (newQuery) => {

      // check if a query is in progress
      if (!loading) {

         setShowAlert(false);

         setCurrentQuery(newQuery);
      } else {

         setAlertMessage(`Please wait for the current query to complete.`);

         setShowAlert(true);
      }
   }


   /** 
   * Return: QueryButton JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <div>

         {/* if admin, display all options */}
         {userAdminPermissions ?

            <div className="set-buttons">
               <MuiThemeProvider theme={queryButtonTheme}>
                  <Button variant={currentQuery === 'live' ? "contained" : "text"} color="primary"
                     onClick={() => checkQueryInProgress('live')} onTouchStart={() => checkQueryInProgress('live')}>
                     Hour
                        </Button>

                  <Button variant={currentQuery === 'daily' ? "contained" : "text"} color="primary"
                     onClick={() => checkQueryInProgress('daily')} onTouchStart={() => checkQueryInProgress('daily')}>
                     Day
                        </Button>

                  <Button variant={currentQuery === 'weekly' ? "contained" : "text"} color="primary"
                     onClick={() => checkQueryInProgress('weekly')} onTouchStart={() => checkQueryInProgress('weekly')}>
                     Week
                        </Button>

                  <Button variant={currentQuery === 'monthly' ? "contained" : "text"} color="primary"
                     onClick={() => checkQueryInProgress('monthly')} onTouchStart={() => checkQueryInProgress('monthly')}>
                     Month
                        </Button>

                  <Button variant={currentQuery === 'quarterly' ? "contained" : "text"} color="primary"
                     onClick={() => checkQueryInProgress('quarterly')} onTouchStart={() => checkQueryInProgress('quarterly')}>
                     Quarter
                        </Button>

                  <Button variant={currentQuery === 'yearly' ? "contained" : "text"} color="primary"
                     onClick={() => checkQueryInProgress('yearly')} onTouchStart={() => checkQueryInProgress('yearly')}>
                     Year
                        </Button>
               </MuiThemeProvider>
            </div>
            :
            <div className="set-buttons">
               <MuiThemeProvider theme={queryButtonTheme}>
                  <Button variant={currentQuery === 'live' ? "contained" : "text"} color="primary"
                     onClick={() => checkQueryInProgress('live')}>
                     Hour
                        </Button>

                  <Button variant={currentQuery === 'daily' ? "contained" : "text"} color="primary"
                     onClick={() => checkQueryInProgress('daily')}>
                     Day
                        </Button>
               </MuiThemeProvider>
            </div>}

         {loading ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Query In Progress'}
               description={alertMessage} />
            :
            null}

      </div>
   );
}

export default QueryButtons;