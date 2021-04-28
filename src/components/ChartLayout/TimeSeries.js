
// styling
import './TimeSeries.css';

// page imports
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import _ from 'lodash';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import PulseLoader from "react-spinners/PulseLoader";

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { EnvironmentContext } from '../../contexts/EnvironmentContext';

// components
import { IconButton } from '@material-ui/core';
import Plot from 'react-plotly.js';
import { CSVLink } from "react-csv";
import Tooltip from '@material-ui/core/Tooltip';
import QueryButtons from './QueryButtons';
import AlertNotification from '../Notification/AlertNotification';

// functions
import PullRoomData from '../../utilities/Dashboard/PullRoomData';


/** 
* Component: TimeSeries
* 
* Component that handles data formatting and display in the plotly time series
*
* @param {props} props
*/
const TimeSeries = (props) => {

   const {

      // {string} building for the query
      building,

      // {string} room for the query
      room,

      // {int} capacity of the room
      capacity,

      // {int} id for the chart for future removal
      chartID

   } = props;

   // {string} base url for the endpoints
   const { baseURL } = useContext(EnvironmentContext);

   const {

      // {list} chart objects that are mapped in grid layout
      selectedCharts,

      // {list} set the list of chart objects
      setSelectedCharts

   } = useContext(DataContext);

   const {

      // {boolean} if user has admin permissions
      userAdminPermissions,

      // {boolean} if user can view raw data
      userViewRawData

   } = useContext(AuthenticationContext);

   // {boolean} if alert should be shown
   const [showAlert, setShowAlert] = useState(false);

   // {string} type of alert to be shown
   const [alertType, setAlertType] = useState('');

   // {string} message to shown in the alert
   const [alertMessage, setAlertMessage] = useState('');

   // {string} current query sent to the back end database
   const [currentQuery, setCurrentQuery] = useState('live');

   // {boolean} if a query is in progress
   const [loading, setLoading] = useState(false);

   // {list} data after being processed for CSV download
   const [csvData, setCSVData] = useState([]);

   // {list} pulled counts for display
   const [graphCountData, setGraphCountData] = useState([]);

   // {list} pulled timestamps for display
   const [graphTimestampData, setGraphTimestampData] = useState([]);

   // {object} settings for auto resize of chart to fit container
   const { width, height, ref } = useResizeDetector({
      refreshMode: 'debounce',
      refreshRate: 10
   });

   // {object} plotly layout settings based on user permissions
   let layout = {
      title: `${building} ${room}`,
      xaxis: { visible: false, fixedrange: true },
      yaxis: { zeroline: false, fixedrange: true, range: userViewRawData ? [0, capacity] : [0, 100] },
      autosize: true,
      width: width,
      height: height,
      margin: { l: 50, r: 50, b: 50, t: 75, pad: 4 },
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
   };


   // {object} data for display by plotly
   const data = [{
      type: "scatter",
      mode: "lines",
      x: graphTimestampData,
      y: graphCountData,
      line: { color: '#003466' }
   }];


   // Material UI theme
   const timeSeriesButtonTheme = createMuiTheme({
      typography: {
         fontFamily: 'Open Sans',
         fontSize: 16
      },
      props: {
         MuiIconButton: {
            disableRipple: true
         }
      },
      overrides: {
         MuiTooltip: {
            tooltip: {
               fontSize: "1em"
            }
         }
      }
   });


   /** 
    * Function: formatTimestamp
    * 
    * Converts isoDate in the response to a time string for use in the x-axis
    * 
    * @param {int} isoDate
    */
   const formatTimestamp = useCallback((isoDate) => {

      let parsedDate = new Date(isoDate);

      let dateString;

      if (currentQuery === 'quarterly' || currentQuery === 'yearly') {
         dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
      } else {
         dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()}/${parsedDate.getFullYear()}` +
            ` ${addZeroToTimestamp(parsedDate.getHours())}:${addZeroToTimestamp(parsedDate.getMinutes())}:${addZeroToTimestamp(parsedDate.getSeconds())}`;
      }

      return dateString;

   }, [currentQuery]);


   /** 
   * Function: addZeroToTimestamp
   * 
   * Adds extra zero if number is a single digit
   * 
   * @param {int} time
   */
   const addZeroToTimestamp = (time) => {
      if (time < 10) {
         time = "0" + time;
      }
      return time;
   }


   /** 
   * Function: unpackDataForDisplay
   * 
   * Takes data from response and unpacks it for use in the time series
   * 
   * If can view raw data, will display the raw counts
   * 
   * If cannot view raw data, will convert to percentages
   * 
   * @param {list} resultData
   */
   const unpackDataForDisplay = useCallback((resultData) => {

      // maps all converted timestamps
      let timestamps = _.map(resultData, resultData => formatTimestamp(resultData.timestamp.$date));

      // sets timestamps to state
      setGraphTimestampData(timestamps);

      // maps all counts
      let counts = _.map(resultData, resultData => resultData.count);

      // if can view raw data, set directly to state
      if (userViewRawData) {

         setGraphCountData(counts);

      } else {

         // convert counts to percentages and set to state
         let percentCounts = [];

         for (let index = 0; index < counts.length; index++) {
            percentCounts[index] = `${(counts[index] / capacity) * 100}%`;
         }

         setGraphCountData(percentCounts);
      }

      // hide spinner
      setLoading(false);

   }, [capacity, userViewRawData, formatTimestamp]);


   /** 
   * Function: handlePullRoomData
   * 
   * Uses PullRoomData utility function to query back end database and pull data for unpacking
   */
   const handlePullRoomData = useCallback(async () => {

      const result = await PullRoomData(baseURL, building, room, currentQuery);

      // if error is returned
      if (result instanceof Error) {

         // set alert type
         setAlertType('room-data-pull-failure');

         setAlertMessage(result.message);

         // show alert
         setShowAlert(true);

      } else {

         let resultData = result.data.data;

         unpackDataForDisplay(resultData);

      }
   }, [baseURL, building, room, currentQuery, unpackDataForDisplay]);


   /** 
   * Function: removeChart
   * 
   * Removes chart from selectedCharts list
   */
   const removeChart = () => {

      let array = [...selectedCharts];

      // removes chart with matching ID
      _.remove(array, {
         chartID: chartID
      });

      // shifts all charts to new ID positions
      for (let index = 0; index < array.length; index++) {
         array[index].chartID = index;
      };

      // sets updated list to display
      setSelectedCharts(array);
   }


   /** 
   * Function: createCSVData
   * 
   * Packages currently unpacked data as a CSV file for download
   */
   const createCSVData = () => {

      let index;

      let data = [];

      for (index = 0; index < graphCountData.length; index++) {
         data.push({ count: graphCountData[index], timestamp: graphTimestampData[index] });
      }

      setCSVData(data);
   }


   /** 
   * Function: useEffect
   * 
   * On room of query change, will re render the charts in the grid layout
   */
   useEffect(() => {

      setLoading(true);

      handlePullRoomData();

      // if query is hour(live) begin new data pull every five seconds
      if (currentQuery === 'live') {

         let intervalID = setInterval(() => { handlePullRoomData() }, 5000);

         return () => clearInterval(intervalID);
      }

   }, [room, currentQuery, handlePullRoomData]);


   /** 
    * Return: TimeSeries JSX
    * 
    * Returns the layout for display in the browser
    */
   return (

      <div ref={ref} style={{ height: '90%', width: "100%" }}>

         <MuiThemeProvider theme={timeSeriesButtonTheme}>
            <Tooltip title="Close Chart" arrow>
               <IconButton className="delete-button" aria-label="delete" onClick={() => removeChart()} onTouchStart={() => removeChart()}>
                  <CloseIcon color="secondary" />
               </IconButton>
            </Tooltip>

            {userAdminPermissions && !loading ?
               <div>
                  <Tooltip title="Download CSV" arrow>
                     <IconButton className="download-button" aria-label="download">
                        <CSVLink
                           data={csvData}
                           header={[{ label: "Footfall", key: userViewRawData === true ? "count" : "usage" }, { label: "Timestamp", key: "timestamp" }]}
                           filename={`${building}_${room}_${currentQuery}.csv`}
                           target="_self"
                           className="csv-anchor-link"
                           onClick={() => createCSVData()}
                           onTouchStart={() => createCSVData()}
                        >
                           <GetAppIcon color="primary" />
                        </CSVLink>
                     </IconButton>
                  </Tooltip>
               </div>
               :
               null
            }
         </MuiThemeProvider>
         {!loading ?
            <div id="chart">
               <Plot
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                  config={{
                     responsive: true,
                     displayModeBar: false
                  }}
                  data={data}
                  layout={layout}
               />
            </div>
            :
            <div className="spinner-div">
               <PulseLoader color={'#003466'} loading={true} size={20} />
            </div>
         }

         <QueryButtons currentQuery={currentQuery} setCurrentQuery={setCurrentQuery} loading={loading} />

         {alertType === 'room-data-pull-failure' ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={`${building} - ${room}: Data Pull Failure`}
               description={alertMessage} />
            :
            null}
      </div >
   );
}

export default TimeSeries;
