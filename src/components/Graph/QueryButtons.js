
// styling
import './QueryButtons.css';

// page imports
import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// components
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// row of buttons for changing chart query
const QueryButtons = (props) => {

    // consume props
    const { currentQuery, setCurrentQuery, loading } = props;

    // consume context
    const { userAdminPermissions } = useContext(AuthContext);

    // state for alert
    const [showAlert, setShowAlert] = useState(false);

    // custom material theme
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

    const updateQuery = (newQuery) => {

        if(!loading) {
            setCurrentQuery(newQuery);
        }

        else{
            setShowAlert(true);
        }
    }

    // returns row based on user permissions
    return (
        <div>
            {userAdminPermissions === true ?

                <div className="set-buttons">
                    <MuiThemeProvider theme={queryButtonTheme}>
                        <Button variant={currentQuery === 'live' ? "contained" : "text"} color="primary"
                            onClick={() => updateQuery('live')} onTouchStart={() => updateQuery('live')}>
                            Hour
                    </Button>

                        <Button variant={currentQuery === 'daily' ? "contained" : "text"} color="primary"
                            onClick={() => updateQuery('daily')} onTouchStart={() => updateQuery('daily')}>
                            Day
                    </Button>

                        <Button variant={currentQuery === 'weekly' ? "contained" : "text"} color="primary"
                            onClick={() => updateQuery('weekly')} onTouchStart={() => updateQuery('weekly')}>
                            Week
                    </Button>

                        <Button variant={currentQuery === 'monthly' ? "contained" : "text"} color="primary"
                            onClick={() => updateQuery('monthly')} onTouchStart={() => updateQuery('monthly')}>
                            Month
                    </Button>

                        <Button variant={currentQuery === 'quarterly' ? "contained" : "text"} color="primary"
                            onClick={() => updateQuery('quarterly')} onTouchStart={() => updateQuery('quarterly')}>
                            Quarter
                    </Button>

                        <Button variant={currentQuery === 'yearly' ? "contained" : "text"} color="primary"
                            onClick={() => updateQuery('yearly')} onTouchStart={() => updateQuery('yearly')}>
                            Year
                    </Button>
                    </MuiThemeProvider>
                </div>
                :
                <div className="set-buttons">
                    <MuiThemeProvider theme={queryButtonTheme}>
                        <Button variant={currentQuery === 'live' ? "contained" : "text"} color="primary"
                            onClick={() => updateQuery('live')}>
                            Hour
                        </Button>

                        <Button variant={currentQuery === 'daily' ? "contained" : "text"} color="primary"
                            onClick={() => updateQuery('daily')}>
                            Day
                        </Button>
                    </MuiThemeProvider>
                </div>}

                {showAlert === true && loading === true ?
                <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Query In Progress'}
                description={`Please wait for the current query to complete.`} />
                :
                null}
                
            </div>
    );
}

export default QueryButtons;