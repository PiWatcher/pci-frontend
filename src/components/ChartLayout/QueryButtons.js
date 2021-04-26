
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
*/
const QueryButtons = (props) => {

   const { currentQuery, setCurrentQuery, handleQueryChange, loading } = props;

   const { userAdminPermissions } = useContext(AuthenticationContext);

   const [showAlert, setShowAlert] = useState(false);

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
   */
   const checkQueryInProgress = (newQuery) => {

      // check if a query is in progress
      if (!loading) {

         setShowAlert(false);

         handleQueryChange();

         setCurrentQuery(newQuery);
      } else {
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
         {userAdminPermissions === true ?

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
               description={`Please wait for the current query to complete.`} />
            :
            null}

      </div>
   );
}

export default QueryButtons;