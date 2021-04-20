
// styling
import './QueryButtons.css';

// page imports
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// contexts
import { AuthContext } from '../../contexts/AuthContext';

// row of buttons for changing chart query
const QueryButtons = (props) => {

    // consume props
    const { currentQuery, setCurrentQuery } = props;

    // consume context
    const { userAdminPermissions } = useContext(AuthContext);

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

    // returns row based on user permissions
    return (
        userAdminPermissions === true ?

            <div className="set-buttons">
                <MuiThemeProvider theme={queryButtonTheme}>
                    <Button variant={currentQuery === 'live' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('live')} onTouchStart={() => setCurrentQuery('live')}>
                        Hour
                </Button>

                    <Button variant={currentQuery === 'daily' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('daily')} onTouchStart={() => setCurrentQuery('daily')}>
                        Day
                </Button>

                    <Button variant={currentQuery === 'weekly' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('weekly')} onTouchStart={() => setCurrentQuery('weekly')}>
                        Week
                </Button>

                    <Button variant={currentQuery === 'monthly' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('monthly')} onTouchStart={() => setCurrentQuery('monthly')}>
                        Month
                </Button>

                    <Button variant={currentQuery === 'quarterly' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('quarterly')} onTouchStart={() => setCurrentQuery('quarterly')}>
                        Quarter
                </Button>

                    <Button variant={currentQuery === 'yearly' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('yearly')} onTouchStart={() => setCurrentQuery('yearly')}>
                        Year
                </Button>
                </MuiThemeProvider>
            </div>
            :
            <div className="set-buttons">
                <MuiThemeProvider theme={queryButtonTheme}>
                    <Button variant={currentQuery === 'live' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('live')}>
                        Hour
                    </Button>

                    <Button variant={currentQuery === 'daily' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('daily')}>
                        Day
                    </Button>
                </MuiThemeProvider>
            </div>
    );
}

export default QueryButtons;