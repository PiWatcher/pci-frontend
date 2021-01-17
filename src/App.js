
// styling
import './App.css';

// page imports
import React from 'react';

// contexts
import BuildingContextProvider from './contexts/BuildingContext';
import RoomContextProvider from './contexts/RoomContext';
import CountContextProvider from './contexts/CountContext';

// components
import Navbar from './components/Navbar';
import RoomList from './components/RoomList';
import LineGraph from './components/LineGraph';
import CountCard from './components/CountCard';


const App = () => {

      return (
        <div className="App">
          <BuildingContextProvider>
            <Navbar/>

            <RoomContextProvider>
              
              <CountContextProvider>
                <div className="wide">
                  <CountCard />  
                </div>
                    
                <div className="column">      
                  <LineGraph />
                </div>
              </CountContextProvider>

              <div className="column">
                <RoomList />
              </div>
            </RoomContextProvider>

          </BuildingContextProvider>
        </div>
      );
    }

export default App;