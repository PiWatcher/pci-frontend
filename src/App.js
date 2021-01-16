
// styling
import './App.css';

// page imports
import React from 'react';

// contexts
import BuildingContextProvider from './contexts/BuildingContext';
import RoomContextProvider from './contexts/RoomContext';
import CountContextProvider from './contexts/CountContext';

// components
import SearchBar from './components/SearchBar';
import RoomList from './components/RoomList';
import LineGraph from './components/LineGraph';
import CountCard from './components/CountCard';


const App = () => {

      return (
        <div className="App">
          <BuildingContextProvider>
            <SearchBar />
          
            <RoomContextProvider>
              <RoomList />

              <CountContextProvider>
                <div className="count-row">          
                  <LineGraph />
                  <CountCard />
                </div>
              </CountContextProvider>

            </RoomContextProvider>

          </BuildingContextProvider>
        </div>
      );
    }

export default App;