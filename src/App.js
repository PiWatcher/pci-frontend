import './App.css';
import LineGraph from './components/LineGraph';
import React, {Component} from 'react';



class App extends Component{
    
  render () {
      return (
        <div className="App">
          <LineGraph/>
        </div>
      )
    }
  }

export default App;