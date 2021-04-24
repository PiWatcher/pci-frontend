
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
import PulseLoader from "react-spinners/PulseLoader";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

// components
import AlertNotification from '../Notification/AlertNotification';
import PullRoomData from '../../components/Utilites/Dashboard/PullRoomData'

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

// chart component
const TimeSeries = (props) => {

   // consume data from DataContext
   const { baseURL, selectedCharts, setSelectedCharts } = useContext(DataContext);

   // consume context
   const { userAdminPermissions, userViewRawData } = useContext(AuthContext);

   // consume props
   const { building, room, capacity, chartID } = props;

   // state for alert
   const [showAlert, setShowAlert] = useState(false);

   // state for alert type
   const [alertType, setAlertType] = useState('');

   // state for current query of query buttons
   const [currentQuery, setCurrentQuery] = useState('live');

   // state for displaying spinner
   const [loading, setLoading] = useState(false);

   // state for holding CSV data
   const [csvData, setCSVData] = useState([]);

   // state for displaying spinner
   const [graphCountData, setGraphCountData] = useState([]);

   // state for displaying spinner
   const [graphTimestampData, setGraphTimestampData] = useState([]);

   // state for live query timeout
   const [queryInterval, setQueryInterval] = useState(null);

   // settings for auto resize of chart to fit container
   const { width, height, ref } = useResizeDetector({
      refreshMode: 'debounce',
      refreshRate: 10
   })

   // plotly layout settings
   let layout = {};

   // set plotly layout based on user permissions
   userViewRawData === true ?

      // set chart layout settings with raw data
      layout = {
         title: `${building} ${room}`,
         xaxis: { visible: false, fixedrange: true },
         yaxis: { zeroline: false, fixedrange: true, range: [0, capacity] },
         autosize: true,
         width: width,
         height: height,
         margin: { l: 50, r: 50, b: 50, t: 75, pad: 4 },
         plot_bgcolor: "rgba(0,0,0,0)",
         paper_bgcolor: "rgba(0,0,0,0)",
      }
      :

      // set chart layout settings with percentages
      layout = {
         title: `${building} ${room}`,
         xaxis: { visible: false, fixedrange: true },
         yaxis: { zeroline: false, fixedrange: true, range: [0, 100] },
         autosize: true,
         width: width,
         height: height,
         margin: { l: 50, r: 50, b: 50, t: 75, pad: 4 },
         plot_bgcolor: "rgba(0,0,0,0)",
         paper_bgcolor: "rgba(0,0,0,0)",
      };

      // set data for plotly display
   const data = [{
      type: "scatter",
      mode: "lines",
      x: graphTimestampData,
      y: graphCountData,
      line: { color: '#003466' }
   }];

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

   // converts isoDate to a string for display 
   const formatTimeStamp = (isoDate) => {

      let parsedDate = new Date(isoDate);

      let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()}/${parsedDate.getFullYear()} ${addZeroToTimeStamp(parsedDate.getHours())}:${addZeroToTimeStamp(parsedDate.getMinutes())}:${addZeroToTimeStamp(parsedDate.getSeconds())}`;

      return dateString;
   };

   // add zero to the time if single digit for formatting
   const addZeroToTimeStamp = (time) => {
      if (time < 10) {
         time = "0" + time;
      }
      return time;
   }

   // unpacks response data according to user permissions
   const unpackDataForDisplay = (resultData) => {

      let timestamps = _.map(resultData, resultData => formatTimeStamp(resultData.timestamp.$date));

      setGraphTimestampData(timestamps);

      let counts = _.map(resultData, resultData => resultData.count);

      console.log("unpacking data");

      if (userViewRawData === true) {

         setGraphCountData(counts);
      } else {

         let percentCounts = [];

         for (let index = 0; index < counts.length; index++) {
            percentCounts[index] = `${(counts[index] / capacity) * 100}%`;
         }

         setGraphCountData(percentCounts);
      }


      console.log(loading)

      // hide spinner
      setLoading(false);

      console.log(loading)

      // if live query, repeat data pull
      if(currentQuery === 'live'){

         setQueryInterval(setTimeout(handlePullRoomData, 5000));
      }
   };

   
   const handlePullRoomData = async () => {

      const result = await PullRoomData(baseURL, building, room, currentQuery);

      if(result instanceof Error) {
         // set alert type
         setAlertType('room-data-pull-failure')

         // show alert
         setShowAlert(true);
     } else {

         let resultData = result.data.data;


         console.log(resultData);

         unpackDataForDisplay(resultData);
     }
  };

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

   // create CSV file with pulled data
   const createCSVData = () => {

      let index;

      let data = [];

      for (index = 0; index < graphCountData.length; index++) {
         data.push({ count: graphCountData[index], timestamp: graphTimestampData[index] });
      }

      setCSVData(data);
   }

   // on room change or query change
   useEffect(() => {

      // initial load spinner (show)
      setLoading(true);

      // clear previous interval
      setQueryInterval(clearTimeout(queryInterval));

      // pull data once
      handlePullRoomData();

   }, [room, currentQuery]);


   return (

      <div ref={ref} style={{ height: '90%', width: "100%" }}>

         <MuiThemeProvider theme={timeSeriesButtonTheme}>
            <Tooltip title="Close Chart" arrow>
               <IconButton className="delete-button" aria-label="delete" onClick={() => removeChart()} onTouchStart={() => removeChart()}>
                  <CloseIcon color="secondary" />
               </IconButton>
            </Tooltip>

            {userAdminPermissions === true && loading === false ?
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

         <QueryButtons currentQuery={currentQuery} setCurrentQuery={setCurrentQuery} loading={loading} />

         {showAlert === true && alertType === 'room-data-pull-failure'?
            <AlertNotification showAlert={showAlert} setShowAlert={setShowAlert} title={'Data Pull Failure'}
               description={`Failed to pull data from endpoint: building: ${building}, room: ${room}, query: ${currentQuery}`} />
            :
            null}
      </div >
   );
}

export default TimeSeries;
