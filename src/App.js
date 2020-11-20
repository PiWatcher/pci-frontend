import './App.css';
import LineGraph from './components/LineGraph';
import CountCard from './components/CountCard';
import React, {Component} from 'react';
import axios from 'axios';


class App extends Component{

  

  // Constructor for entire app and state
  constructor() {
    super();
    this.state = {
      labels: [],
      rooms: []
    }
  }

  // rescue data if axios fails to connect to the endpoint
  fallBack = [
    {
      "room": 101,
      "count": 0
    }
  ]

  // gets data from API after the app is mounted
  componentDidMount() {
    this.getData();
  }

  // retrieves data from API
  getData = async() => {
    try {
      let data = await axios({
        method: 'get',
        url: 'http://localhost:4000/SICCS/'
      }).then(({data}) => data);
      console.log(data)
      this.setState({rooms: data})
      this.setState({labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM']})
      console.log({rooms: data})
    } catch (err) {
      this.setState({rooms : this.fallBack})
      console.log(err)
    }
  }
  
  // renders the app and it's components with state passed down to children
  render () {
      
      return (
        
        <div className="App">
          <div className="count-row">            
            <LineGraph count = {this.state.rooms} labels = {this.state.labels} />
            <CountCard count = {this.state.rooms} />
          </div>
        </div>
      )
    }
  }

export default App;