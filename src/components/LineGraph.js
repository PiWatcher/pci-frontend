import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './LineGraph.css';

class LineGraph extends Component {

   // constructor for graph component
   constructor(props) {

      super(props);

      // sets the data for the graph visual within the state
      this.state = {
         graphData: {
            labels: this.props.labels,
    
            datasets: [
            {
               label: 'Average Counted',
               data: [909, 241, 305, 487, 267, 904, 578, 489, this.props.count],
               backgroundColor:[
                  'rgba(255, 51, 51, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 51, 51, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(54, 162, 235, 0.6)'
               ]
            }]   
         }
      };
   }

   // renders the graph with the passed down state
   render(){
      return (
         <div className="LineGraph">
            <Line
               data={this.state.graphData}

               options={{
                  title:{
                     display: true,
                     text: 'People Counted Over Time',
                     fontSize:25
                    },
                  maintainAspectRatio: false
               }}
            />
         </div>
      )
   }
}

export default LineGraph;
