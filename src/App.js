import './App.css';
import LineGraph from './components/LineGraph';
import SearchBar from './components/SearchBar';
import CountCard from './components/CountCard';
import React, {Component} from 'react';
import axios from 'axios';


class App extends Component{

  

  // Constructor for entire app and state
  constructor(props) {
    super(props);
    

  // binds this to the getData method so the state is accurate
  //this.getData = this.getData.bind(this)

  }

  
  // renders the app and it's components with state passed down to children
  render () {
      return (
        <div className="App">
          <div className="count-row">
              <SearchBar />            
               {/* <LineGraph bldg_data = {this.state.bldg_data} />
              <CountCard bldg_data = {this.state.bldg_data} /> */}
          </div>
        </div>
      );
    }
  }

export default App;