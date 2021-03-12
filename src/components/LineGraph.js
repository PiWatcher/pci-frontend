
// styling
import './LineGraph.css';



// page imports
import React, { useContext, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


// contexts
import { DataContext } from '../contexts/DataContext';


const LineGraph = () => {

   // consume data from DataContext
   const { building, room, countList } = useContext(DataContext);

   const [currentQuery, setCurrentQuery] = useState('live');

   // data to be displayed in the graph
   const graphData = (canvas) => {

      let counts = countList.map(function (item) {
         return item.count;
      })

      let times = countList.map(function (item) {
         return item.timestamp;
      })

      var ctx = canvas.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 0, 1000);

      gradient.addColorStop(0, "rgb(0, 52, 102, 0.5)");
      gradient.addColorStop(0.25, "rgb(0, 52, 102, 0.7)");
      gradient.addColorStop(0.5, "rgb(0, 52, 102, 0.8)");
      gradient.addColorStop(0.75, "rgb(0, 52, 102, 0.9)");
      gradient.addColorStop(1, "rgb(0, 52, 102, 1)");

      return {
         labels: times,
         datasets: [{
            label: 'Count',
            data: counts,
            fill: "start",
            backgroundColor: gradient,
            borderColor: "rgb(0, 52, 102, 0.6)",
            pointBackgroundColor: "rgba(255, 215, 0, .9)",
            pointBorderColor: "rgba(255, 215, 0, .9)",
            pointRadius: 5,
            pointHoverRadius: 7
         }]
      }
   }

   // graph options for data display
   const options = {
      title: {
         display: true,
         text: building + (room === '' ? room : " - " + room),
         fontSize: 30,
         fontColor: "#000000",
         fontFamily: 'Open Sans'
      },
      layout: {
         margin: {
            left: 10,
            right: 10,
            top: 0,
            bottom: 0
         },
         padding: {
            left: 5,
            right: 5,
            top: 10,
            bottom: 10
         }
      },
      legend: {
         display: false
      },
      tooltips: {
         backgroundColor: "#003466",
         titleAlign: 'center',
         bodyAlign: 'center'
      },
      scales: {
         xAxes: [{
            ticks: {
               display: false,
            },
            gridLines: {
               display: false
            }
         }],
         yAxes: [{
            ticks: {
               display: true,
               fontColor: "#000000",
               fontSize: 16,
               fontFamily: 'Open Sans',
               beginAtZero: true,
               precision: 0
            },
            gridLines: {
               display: true,
               drawBorder: false,
               lineWidth: 2
            }
         }]
      },
      maintainAspectRatio: false,
      responsive: true
   };

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

   const graphQuery = (queryTime) => {

      setCurrentQuery(queryTime);

      // send query to database for past data

   }


   // updates graph on data change
   useEffect(() => {

   }, [countList])

   // returns the graph with the passed down state
   return (
      <div className="line-graph-component">
         <Line
            data={graphData}
            options={options}
         />

         <div className="set-buttons">
            <MuiThemeProvider theme={queryButtonTheme}>
               <Button variant={currentQuery === 'live' ? "contained" : "text"} color="secondary"
                  onClick={() => graphQuery('live')}>
                  Live
               </Button>

               <Button variant={currentQuery === '24 hours' ? "contained" : "text"} color="primary"
                  onClick={() => graphQuery('24 hours')}>
                  24 Hours
               </Button>

               <Button variant={currentQuery === '1 week' ? "contained" : "text"} color="primary"
                  onClick={() => graphQuery('1 week')}>
                  1 Week
               </Button>

               <Button variant={currentQuery === '1 month' ? "contained" : "text"} color="primary"
                  onClick={() => graphQuery('1 month')}>
                  1 Month
               </Button>

               <Button variant={currentQuery === '3 months' ? "contained" : "text"} color="primary"
                  onClick={() => graphQuery('3 months')}>
                  3 Months
               </Button>

               <Button variant={currentQuery === '6 months' ? "contained" : "text"} color="primary"
                  onClick={() => graphQuery('6 months')}>
                  6 Months
               </Button>

               <Button variant={currentQuery === '12 months' ? "contained" : "text"} color="primary"
                  onClick={() => graphQuery('12 months')}>
                  12 Months
               </Button>
            </MuiThemeProvider>
         </div>
      </div>
   )
}

export default LineGraph;
