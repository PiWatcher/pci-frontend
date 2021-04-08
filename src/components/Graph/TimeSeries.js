
// styling
import './TimeSeries.css';

// page imports
import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { useResizeDetector } from 'react-resize-detector';
import _ from 'lodash';
import QueryButtons from './QueryButtons';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CSVLink } from "react-csv";
import html2canvas from 'html2canvas';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PulseLoader from "react-spinners/PulseLoader";
import { unstable_createMuiStrictModeTheme as createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

// components
import AlertNotification from '../Notification/AlertNotification';

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

// chart component
const TimeSeries = (props) => {

   // consume data from DataContext
   const { baseURL, selectedCharts, setSelectedCharts } = useContext(DataContext);

   // consume context
   const { userAdminPermissions } = useContext(AuthContext);

   // consume props
   const { building, room, chartID } = props;

   // state for chart data
   const [graphList, setGraphList] = useState([]);

   // state for alert
   const [showAlert, setShowAlert] = useState(false);

   // state for current query of query buttons
   const [currentQuery, setCurrentQuery] = useState('live');

   // state for displaying spinner
   const [loading, setLoading] = useState(false);

   // state for holding CSV data
   const [csvData, setCSVData] = useState([]);

   // settings for auto resize of chart to fit container
   const { width, height, ref } = useResizeDetector({
      refreshMode: 'debounce',
      refreshRate: 10
   })

   // custom material theme
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

   // // API pull and parse logic for counts and timestamps
   const pullGraphData = useCallback(async () => {

      // endpoint URL
      const graphDataEndpoint = `${baseURL}:5000/api/data/building/room/${currentQuery}`

      // tries to pull chart data
      try {
         const response = await axios({
            method: 'get',
            url: graphDataEndpoint,
            params: {
               building_name: building,
               room: room
            }
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            // set state for puled chart data
            setGraphList(response.data.data);

            // hide spinner
            setLoading(false);

         }
      }

      // failed to pull chart data
      catch (error) {

         // display failure alert
         setShowAlert(true);

         // display error to console for debugging
         console.error('Error', error.response);
      }
   }, [baseURL, building, currentQuery, room]);


   // converts isoDate to a string for display 
   const createTime = (isoDate) => {

      let parsedDate = new Date(isoDate);

      let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()}/${parsedDate.getFullYear()} ${addZero(parsedDate.getHours())}:${addZero(parsedDate.getMinutes())}:${addZero(parsedDate.getSeconds())}`;

      return dateString;
   }


   // add zero to the time if single digit for formatting
   const addZero = (time) => {
      if (time < 10) {
         time = "0" + time;
      }
      return time;
   }


   // remove chart from grid
   const removeChart = () => {
      let array = [...selectedCharts];

      // removes chart with matching ID
      _.remove(array, {
         chartID: chartID
      });

      // shifts all charts to new ID positions
      for (let index = 0; index < array.length; index++) {
         array[index].chartID = index;
      }

      // sets updated list to display
      setSelectedCharts(array);
   }

   // set data for display
   const data = [{
      type: "scatter",
      mode: "lines",
      x: _.map(graphList, data => createTime(data.timestamp.$date)),
      y: _.map(graphList, data => data.count),
      line: { color: '#003466' }
   }];


   // set chart layout settings
   const layout = {
      title: `${building} ${room}`,
      xaxis: { visible: false, fixedrange: true },
      yaxis: { zeroline: false, fixedrange: true },
      autosize: true,
      width: width,
      height: height,
      margin: { l: 50, r: 50, b: 50, t: 75, pad: 4 },
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
   };

   // create CSV file with pulled data
   const createCSVData = () => {

      let index;

      let data = [];

      let counts = _.map(graphList, data => data.count);

      let timestamps = _.map(graphList, data => createTime(data.timestamp.$date))

      for (index = 0; index < counts.length; index++) {
         data.push({ count: counts[index], timestamp: timestamps[index] });
      }

      setCSVData(data);
   }

   // saves image of chart
   const saveChart = () => {
      html2canvas(document.querySelector("#chart")).then(function (canvas) {
         let link = document.createElement('a');
         link.href = canvas.toDataURL("image/png");
         link.download = `${building}_${room}_${currentQuery}.png`
         link.click();
      });
   };

   // on room change or query change, resets pull timer
   useEffect(() => {

      // initial load spinner (show)
      setLoading(true);

      pullGraphData();

      // five seconds interval for data refresh 
      const interval = setInterval(() => {
         pullGraphData();
      }, 5000);

      return () => clearInterval(interval);

   }, [currentQuery, pullGraphData]);


   return (

      <div ref={ref} style={{ height: '90%', width: "100%" }}>

         <MuiThemeProvider theme={timeSeriesButtonTheme}>
            <Tooltip title="Remove Chart" arrow>
               <IconButton className="delete-button" aria-label="delete" onClick={() => removeChart()} onTouchStart={() => removeChart()}>
                  <CloseIcon color="secondary" />
               </IconButton>
            </Tooltip>

            {userAdminPermissions === true && loading === false ?
               <div>
                  <Tooltip title="Download Raw Data" arrow>
                     <IconButton className="download-button" aria-label="download">
                        <CSVLink
                           data={csvData}
                           header={[{ label: "Footfall Count", key: "count" }, { label: "Timestamp", key: "timestamp" }]}
                           filename={`${building}_${room}_${currentQuery}.csv`}
                           target=""
                           className="csv-anchor-link"
                           onClick={() => createCSVData()}
                           onTouchStart={() => createCSVData()}
                        >
                           <GetAppIcon color="primary" />
                        </CSVLink>
                     </IconButton>
                  </Tooltip>

                  <Tooltip title="Download Screenshot" arrow>
                     <IconButton onClick={() => saveChart()} onTouchStart={() => saveChart()} className="screenshot-button" aria-label="screenshot">
                        <CameraAltIcon />
                     </IconButton>
                  </Tooltip>
               </div>
               :
               null
            }
         </MuiThemeProvider>
         {loading === false ?
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

         {showAlert === true ?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
               description={`Failed to pull data from endpoint: building: ${building}, room: ${room}, query: ${currentQuery}`} />
            :
            null}

         <QueryButtons currentQuery={currentQuery} setCurrentQuery={setCurrentQuery} />
      </div >
   );
}

export default TimeSeries;
