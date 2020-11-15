import './App.css';
import LineGraph from './components/LineGraph';
import CountCard from './components/CountCard';
import React, {Component} from 'react';


class App extends Component{
    
  render () {
      return (
        <div className="App">
          <div className="count-row">
            <LineGraph/>
            <CountCard/>
          </div>
        </div>
      )
    }
  }


export default App;