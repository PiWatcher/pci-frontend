import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineGraph extends Component {


    constructor(props) {
        super(props);

        this.state = {
            graphData: {
             labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'],
     
             datasets: [
               {
                   label: 'Count',
                   data: [909, 106, 123, 487, 267, 904, 578, 489, 789],
                   backgroundColor:[
                    'rgba(255, 51, 51, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 51, 51, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 51, 51, 0.6)'
                  ]
               }
             ]
           }
         };
    }

    render(){
        return (
            <div className="LineGraph">
                <Line
                    data={this.state.graphData}
                    width='400'
                    height='800'
                    options={{
                        title:{
                            display: true,
                            text: 'People Counted',
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
