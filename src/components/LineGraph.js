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

   get_building = () => {
      let bldg_name = Object.values(Object.values(Object.values(this.props.bldg_data)[0])[3])[2].toString()
      

      return bldg_name
   }

   get_room = () => {
      let room_name = Object.values(Object.values(Object.values(this.props.bldg_data)[0])[3])[4].toString()
      return room_name
   }
   
   get_labels = () => {
      //console.log(this.state.room)
      let temp_labels = []
      let bldg_data = Object.values(this.props.bldg_data)[0]
      for (var i = 0; i < bldg_data.length; i++)
         if (Object.values(bldg_data[i])[4] === this.get_room())
            temp_labels.push(Object.values(bldg_data[i])[0].split(' ')[0])
      return temp_labels
     
   }

   get_values = () => {
      let temp_values = []
      let bldg_data = Object.values(this.props.bldg_data)[0]
      for (var i = 0; i < bldg_data.length; i++)
         if (Object.values(bldg_data[i])[4] === this.get_room())
            temp_values.push(Object.values(bldg_data[i])[5])
      return temp_values
   }

   set_value_colors = () => {
      let temp_colors = []
      let bldg_data = Object.values(this.props.bldg_data)[0]
      for (var i = 0; i < bldg_data.length; i++)
         if (Object.values(bldg_data[i])[4] === this.get_room())
            temp_colors.push('rgba(255, 51, 51, 0.6)')
      return temp_colors
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
