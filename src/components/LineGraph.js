
// styling
//import './LineGraph.css';


// page imports
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from 'axios';
import Plot from 'react-plotly.js';


// contexts
import { DataContext } from '../contexts/DataContext';


const LineGraph = (props) => {

   // consume data from DataContext
   const { selectedBuilding, baseURL } = useContext(DataContext);

   const [graphList, setGraphList] = useState([]);

   const [currentQuery, setCurrentQuery] = useState('live');

   let counts = [];

   let times = [];

   const plotRef = useRef(null);

   // API pull and parse logic for counts and timestamps
   const getGraphList = async () => {

      // tries to pull and parse selected room data
      try {
         const response = await axios({
            method: 'get',
            url: `${baseURL}:5000/api/data/building` + currentQuery,
            params: {
               building: selectedBuilding,
               room_name: props.room
            }
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            setGraphList(response.data.data);

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

   // data to be displayed in the graph
   const graphData = () => {

      getGraphList();

      counts = graphList.map(function (item) {
         return item.count;
      })

      times = graphList.map(function (item) {
         // formats the date
         let date = item.timestamp;

         let parsedDate = new Date(date);

         let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${addZero(parsedDate.getHours())}:${addZero(parsedDate.getMinutes())}:${addZero(parsedDate.getSeconds())}`;

         return dateString;
      })
   }


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

   const data =
   {
      type: 'scatter',
      mode: 'lines',
      x: [1, 2, 3],
      y: [2, 6, 3],
      line: { color: '#003466' }
   };

   const layout = {
      title: selectedBuilding + ' ' + props.room,
      xaxis: { fixedrange: true },
      yaxis: { fixedrange: true },
      autosize: true
   };

   useEffect(() => {
      graphData();
   }, [props.room])

   // returns the graph with the passed down state
   return (
      <div>
         <Plot className="plot-graph"
            ref={plotRef}
            data={data}
            layout={layout}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
         />

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
      </div>
   );
}

export default LineGraph;
