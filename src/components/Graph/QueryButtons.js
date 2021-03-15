
// styling
import './QueryButtons.css';

// components
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


const QueryButtons = (props) => {

    // consume props
    const { currentQuery, setCurrentQuery } = props;

    // custom material theme for buttons
    const queryButtonTheme = createMuiTheme({
        typography: {
            fontFamily: 'Open Sans',
            fontSize: 16
        },
        props: {
            MuiButton: {
                disableRipple: true,
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
        <div className="set-buttons">
            <MuiThemeProvider theme={queryButtonTheme}>
                <Button variant={currentQuery === 'live' ? "contained" : "text"} color="secondary"
                    onClick={() => setCurrentQuery('live')}>
                    Live
                </Button>

                <Button variant={currentQuery === 'daily' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('daily')}>
                    Daily
                </Button>

                <Button variant={currentQuery === 'Weekly' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('Weekly')}>
                    Weekly
                </Button>

                <Button variant={currentQuery === 'Monthly' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('Monthly')}>
                    Monthly
                </Button>

                <Button variant={currentQuery === 'Quarterly' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('Quarterly')}>
                    Quarterly
                </Button>

                <Button variant={currentQuery === 'Yearly' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('Yearly')}>
                    Yearly
                </Button>
            </MuiThemeProvider>
        </div>
    );
}

export default QueryButtons;