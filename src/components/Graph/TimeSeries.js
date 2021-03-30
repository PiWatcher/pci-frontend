
// styling
import './TimeSeries.css';

// page imports
import React, { useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { useResizeDetector } from 'react-resize-detector';
import _ from 'lodash';
import QueryButtons from './QueryButtons';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CSVLink } from "react-csv";

// contexts
import { DataContext } from '../../contexts/DataContext';
import { AuthContext } from '../../contexts/AuthContext';

// chart component
const TimeSeries = (props) => {

   // consume data from DataContext
   const { baseURL, selectedCharts, setSelectedRooms } = useContext(DataContext);

   // consume context
   const { userAdminPermissions } = useContext(AuthContext);

   // consume props
   const { building, room, key } = props;

   // state for chart data
   const [graphList, setGraphList] = useState([]);

   // state for current query of query buttons
   const [currentQuery, setCurrentQuery] = useState('live');

   // settings for auto resize of chart
   const { width, height, ref } = useResizeDetector({
      refreshMode: 'debounce',
      refreshRate: 10
   })

   // // API pull and parse logic for counts and timestamps
   const pullGraphData = async () => {

      const graphDataEndpoint = `${baseURL}:5000/api/data/building/room/live`

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

            // set state for chart data
            setGraphList(response.data.data);

            console.log(response);

         }
      }

      // failed to pull chart data
      catch (error) {
         //alert(error.response.data['description']);
         console.error('Error', error.response);
      }
   };

   // remove chart from grid
   const removeChart = () => {
      let array = [...selectedCharts];
      let index = array.indexOf(key)
      if (index !== -1) {
         array.splice(index, 1);
         setSelectedRooms(array);
      }
   }

   // set data for display
   const data = [{
      type: "scatter",
      mode: "lines",
      x: _.map(graphList, data => data.timestamp),
      y: _.map(graphList, data => data.count),
      line: { color: '#003466' }
   }];

   // set chart layout settings
   const layout = {
      title: `${building} ${room}`,
      xaxis: { fixedrange: true },
      yaxis: { fixedrange: true },
      autosize: true,
      width: width,
      height: height,
      margin: { l: 50, r: 50, b: 50, t: 75, pad: 4 },
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
   };

   // on room change or query change, resets pull timer
   useEffect(() => {

      pullGraphData();

      // five seconds interval for data refresh 
      const interval = setInterval(() => {
         console.log('grabbing counts');
         pullGraphData();
      }, 5000);

      return () => clearInterval(interval);

   }, [room, currentQuery]);

   // returns the chart with the passed down state and data
   return (
      useMemo(() =>

         <div ref={ref} style={{ height: '85%', width: "100%" }}>

            <IconButton className="delete-button" aria-label="delete" onClick={() => removeChart()}>
               <CloseIcon color="secondary" />
            </IconButton>

            {userAdminPermissions === true ?
               <IconButton className="download-button" aria-label="download" onClick={() => removeChart()}>
                  {/* <CSVLink
                     data={_.map(graphList, data => data.count)}
                     header={_.map(graphList, data => data.timestamp)}
                     filename={`${building}_${room}_${currentQuery}.csv`}
                  >
                     <GetAppIcon color="primary" />
                  </CSVLink> */}
               </IconButton>
               :
               null
            }

            <Plot
               useResizeHandler={true}
               style={{ width: "100%", height: "100%" }}
               config={{ responsive: true }}
               data={data}
               layout={layout}
            />

            <QueryButtons currentQuery={currentQuery} setCurrentQuery={setCurrentQuery} />
         </div >
      )
   );
}

export default TimeSeries;
