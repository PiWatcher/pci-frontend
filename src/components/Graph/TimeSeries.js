
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


// contexts
import { DataContext } from '../../contexts/DataContext';


const TimeSeries = (props) => {

   // consume props
   const { building, room } = props;

   // consume data from DataContext
   const { selectedRooms, setSelectedRooms } = useContext(DataContext);


   // consume data from DataContext
   const { baseURL } = useContext(DataContext);

   const [graphList, setGraphList] = useState([]);

   const [currentQuery, setCurrentQuery] = useState('live');

   const { width, height, ref } = useResizeDetector({
      refreshMode: 'debounce',
      refreshRate: 75
   })

   // // API pull and parse logic for counts and timestamps
   // const getGraphList = async () => {

   //    // tries to pull and parse selected room data
   //    try {
   //       const response = await axios({
   //          method: 'get',
   //          url: `${baseURL}:5000/api/data/building` + currentQuery,
   //          params: {
   //             building: selectedBuilding,
   //             room_name: props.room
   //          }
   //       });

   //       // successfully connected to endpoint and pulled data
   //       if (response.status === 200) {

   //          setGraphList(response.data.data);

   //       }
   //    }

   //    // failed to sign in
   //    catch {
   //       console.log("Failed to pull counts.")
   //    }
   // };

   // API pull and parse logic for counts and timestamps
   const pullGraphData = async () => {

      let localGraphList = []

      // tries to pull and parse selected room data
      try {
         const response = await axios({
            method: 'get',
            url: `${baseURL}:5000/api/data/building`,
            params: {
               building: building
            }
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            let countData = response.data.data;

            // compiles list of counts and timestamps (from beginning of data source)
            for (let countIndex = 0; countIndex < countData.length; countIndex++) {

               if (props.room === countData[countIndex]["endpoint"]) {

                  let roomCount = countData[countIndex]["count"];

                  // formats the date
                  let date = countData[countIndex]["timestamp"]['$date'];

                  let parsedDate = new Date(date);

                  let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${addZero(parsedDate.getHours())}:${addZero(parsedDate.getMinutes())}:${addZero(parsedDate.getSeconds())}`;

                  // creates count/timestamp object and pushes to list

                  localGraphList.push({
                     count: roomCount,
                     timestamp: dateString
                  });
               }
            }

            // sets state to counts/timestamps for selected room
            setGraphList(localGraphList);
         }

      }

      // failed to sign in
      catch {
         console.log("Failed to pull counts.")
      }
   };


   // add zero to the time if single digit
   const addZero = (time) => {
      if (time < 10) {
         time = "0" + time;
      }
      return time;
   }

   // add zero to the time if single digit
   const removeChart = () => {
      let array = [...selectedRooms];
      let index = array.indexOf(room)
      if (index !== -1) {
         array.splice(index, 1);
         setSelectedRooms(array);
      }
   }

   const data = [{
      type: "scatter",
      mode: "lines",
      x: _.map(graphList, data => data.timestamp),
      y: _.map(graphList, data => data.count),
      line: { color: '#003466' }
   }];

   const layout = {
      title: `${building} ${room}`,
      xaxis: { fixedrange: true },
      yaxis: { fixedrange: true },
      autosize: true,
      width: width,
      height: height,
      margin: {
         l: 50,
         r: 50,
         b: 50,
         t: 75,
         pad: 4
      },
   };

   useEffect(() => {

      pullGraphData();

      // five seconds interval for data refresh 
      const interval = setInterval(() => {
         console.log('grabbing counts');
         pullGraphData();
      }, 5000);

      return () => clearInterval(interval);

   }, [room])

   // returns the graph with the passed down state
   return (
      useMemo(() =>

         <div ref={ref} style={{ height: '85%', width: "100%" }}>

            <IconButton className="delete-button" aria-label="delete" onClick={() => removeChart()}>
               <CloseIcon color="secondary" />
            </IconButton>

            <Plot
               useResizeHandler={true}
               style={{ width: "100%", height: "100%" }}
               config={{ responsive: true }}
               data={data}
               layout={layout}
               displayLogo={false}
            />

            <QueryButtons currentQuery={currentQuery} setCurrentQuery={setCurrentQuery} />
         </div >
      )
   );
}

export default TimeSeries;
