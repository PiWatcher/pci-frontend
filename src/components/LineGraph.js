import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './LineGraph.css';

class LineGraph extends Component {

   // constructor for graph component
   constructor(props) {

      super(props);

      // sets the data for the graph visual within the state
      this.state = {
         bldg: this.get_building(),
         room: this.get_room(),
         graphData: {
            labels: this.get_labels(),
    
            datasets: [
            {
               label: 'Average Counted',
               data: this.get_values(),
               backgroundColor: this.set_value_colors()
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
                     text: this.state.bldg + " " + this.state.room,
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
