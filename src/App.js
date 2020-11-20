import './App.css';
import LineGraph from './components/LineGraph';
import CountCard from './components/CountCard';
import React, {Component} from 'react';
import axios from 'axios';


class App extends Component{

  

  // Constructor for entire app and state
  constructor(props) {
    super(props);
    this.state = {
      bldg_data: []
    }

  // binds this to the getData method so the state is accurate
  //this.getData = this.getData.bind(this)

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
      console.log(data);
      this.setState({bldg_data: data})
      console.log({bldg_data: data})
    } catch (err) {
      this.setState({bldg_data : this.fallBack})
      console.log(err)
    }
  }
  
  // renders the app and it's components with state passed down to children
  render () {
      const data_str = JSON.stringify(this.state.bldg_data)
      if (data_str.length < 20){ return null }
      
      return (
        <div className="App">
          <div className="count-row">            
              <LineGraph bldg_data = {this.state.bldg_data} />
              <CountCard bldg_data = {this.state.bldg_data} />
          </div>
        </div>
      );
    }
  }

export default App;