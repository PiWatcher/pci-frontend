import './App.css';
import CountCard from './components/CountCard';
import React, {Component} from 'react';



class App extends Component{
    
  render () {
      return (
        <div className="App">
          <CountCard/>
        </div>
      )
    }
  }

export default App;
