
// styling
import './App.css';

// page imports
import React from 'react';

// contexts
import DataContextProvider from './contexts/DataContext';

// components
import Navbar from './components/Navbar';
import RoomList from './components/RoomList';
import LineGraph from './components/LineGraph';
import TimeCard from './components/TimeCard'
import CountCard from './components/CountCard';


const App = () => {

  return (
    <div className="App">
      <DataContextProvider>
        <Navbar />

        <div className="column">
          <TimeCard />
        </div>

        <div className="column">
          <CountCard />
        </div>

        <div className="column">
          <LineGraph />
        </div>

        <div className="column">
          <RoomList />
        </div>

      </DataContextProvider>
    </div>
  );
}

export default App;