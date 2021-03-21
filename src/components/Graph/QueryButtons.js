
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

                <Button variant={currentQuery === 'weekly' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('weekly')}>
                    Weekly
                </Button>

                <Button variant={currentQuery === 'monthly' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('monthly')}>
                    Monthly
                </Button>

                <Button variant={currentQuery === 'quarterly' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('quarterly')}>
                    Quarterly
                </Button>

                <Button variant={currentQuery === 'yearly' ? "contained" : "text"} color="primary"
                    onClick={() => setCurrentQuery('yearly')}>
                    Yearly
                </Button>
            </MuiThemeProvider>
        </div>
    );
}

export default QueryButtons;