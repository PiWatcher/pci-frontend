
// styling
import './LineGraph.css';

// page imports
import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';

// contexts
import { DataContext } from '../contexts/DataContext';


const LineGraph = () => {

   // consume data from DataContext
   const { building, room, countList, timeList } = useContext(DataContext);

   // FIX: parse for room cleanup for display

   const graphData = { labels: timeList, datasets: [{ label: 'Count over time', data: countList }] }

   // returns the graph with the passed down state
   return (
      <div className="LineGraph">
         <Line
            data={graphData}
            options={{
               title: {
                  display: true,
                  text: building + " " + room,
                  fontSize: 25
               },
               maintainAspectRatio: false,
            }}
         />
      </div>
   )
}

export default LineGraph;
