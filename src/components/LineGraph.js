import React, {useContext} from 'react';
import {Line} from 'react-chartjs-2';
import './LineGraph.css';
import { CountContext } from '../contexts/CountContext';

const LineGraph = () => {

   const { building, room, countList, timeList } = useContext( CountContext );

   // FIX: parse for room cleanup for display
 
   const graphData = {labels: timeList, datasets: [{label: 'Count over time', data: countList}]}

   // renders the graph with the passed down state
      return (
         <div className="LineGraph">
            <Line
               data = { graphData }
               options={{
                  title:{
                     display: true,
                     text: building + " " + room,
                     fontSize:25
                    },
                  maintainAspectRatio: false,
               }}
            />
         </div>
      )
   }

export default LineGraph;
