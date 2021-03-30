
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

    // returns the entire dashboard and its child components
    return (

        userAdminPermissions === true ?

            <div className="set-buttons">
                <MuiThemeProvider theme={queryButtonTheme}>
                    <Button variant={currentQuery === 'hour' ? "contained" : "text"} color="secondary"
                        onClick={() => setCurrentQuery('live')}>
                        Hour
                </Button>

                    <Button variant={currentQuery === 'day' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('daily')}>
                        Day
                </Button>

                    <Button variant={currentQuery === 'week' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('weekly')}>
                        Week
                </Button>

                    <Button variant={currentQuery === 'month' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('monthly')}>
                        Month
                </Button>

                    <Button variant={currentQuery === 'quarter' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('quarterly')}>
                        Quarter
                </Button>

                    <Button variant={currentQuery === 'year' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('yearly')}>
                        Year
                </Button>
                </MuiThemeProvider>
            </div>
            :
            <div className="set-buttons">
                <MuiThemeProvider theme={queryButtonTheme}>
                    <Button variant={currentQuery === 'hour' ? "contained" : "text"} color="secondary"
                        onClick={() => setCurrentQuery('hour')}>
                        Hour
                    </Button>

                    <Button variant={currentQuery === 'day' ? "contained" : "text"} color="primary"
                        onClick={() => setCurrentQuery('day')}>
                        Day
                    </Button>
                </MuiThemeProvider>
            </div>
    );
}

export default QueryButtons;