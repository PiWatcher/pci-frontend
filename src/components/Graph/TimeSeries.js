
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
import html2canvas from 'html2canvas';
import CameraAltIcon from '@material-ui/icons/CameraAlt';


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

   // state for current query of query buttons
   const [currentQuery, setCurrentQuery] = useState('live');

   // settings for auto resize of chart
   const { width, height, ref } = useResizeDetector({
      refreshMode: 'debounce',
      refreshRate: 10
   })


   // // API pull and parse logic for counts and timestamps
   const pullGraphData = async () => {

      console.log(chartID);

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

   const createTime = (isodate) => {

      let parsedDate = new Date(isodate);

      let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${addZero(parsedDate.getHours())}:${addZero(parsedDate.getMinutes())}:${addZero(parsedDate.getSeconds())}`;

      return dateString;
   }

   // add zero to the time if single digit
   const addZero = (time) => {
      if (time < 10) {
         time = "0" + time;
      }
      return time;
   }

   // remove chart from grid
   const removeChart = () => {
      let array = [...selectedCharts];

      _.remove(array, {
         chartID: chartID
      });

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
      xaxis: { visible: false },
      yaxis: { zeroline: false, fixedrange: true },
      autosize: true,
      width: width,
      height: height,
      margin: { l: 50, r: 50, b: 50, t: 75, pad: 4 },
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
   };

   const createCSVData = () => {

      let index;

      let data = [];

      let counts = _.map(graphList, data => data.count);

      let timestamps = _.map(graphList, data => createTime(data.timestamp.$date))

      for (index = 0; index < counts.length; index++) {
         data.push({ count: counts[index], timestamp: timestamps[index] });
      }

      return data;
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

         <div ref={ref} style={{ height: '90%', width: "100%" }}>

            <IconButton className="delete-button" aria-label="delete" onClick={() => removeChart()}>
               <CloseIcon color="secondary" />
            </IconButton>

            {userAdminPermissions === true ?
               <div>
                  <IconButton className="download-button" aria-label="download">
                     <CSVLink
                        data={createCSVData()}
                        header={[{ label: "Footfall Count", key: "count" }, { label: "Timestamp", key: "timestamp" }]}
                        filename={`${building}_${room}_${currentQuery}.csv`}
                     >
                        <GetAppIcon color="primary" />
                     </CSVLink>
                  </IconButton>

                  <IconButton onClick={() => saveChart()} className="download-button" aria-label="download">
                     <CameraAltIcon />
                  </IconButton>
               </div>
               :
               null
            }

            <div id="chart">
               <Plot
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                  config={{ responsive: true, displayModeBar: false }}
                  data={data}
                  layout={layout}
               />
            </div>

            <QueryButtons currentQuery={currentQuery} setCurrentQuery={setCurrentQuery} />
         </div >
      )
   );
}

export default TimeSeries;
