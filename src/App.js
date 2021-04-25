
// styling
import './App.css';

// page imports
import React from 'react';

// contexts
import EnvironmentContextProvider from './contexts/EnvironmentContext';
import AuthenticationContextProvider from './contexts/AuthenticationContext';
import DataContextProvider from './contexts/DataContext';

// components
import PageRouter from './components/Authentication/PageRouter';


const App = () => {

  return (
    <div className="App">
      <EnvironmentContextProvider>
        <AuthenticationContextProvider>
          <DataContextProvider>

            <PageRouter />

          </DataContextProvider>
        </AuthenticationContextProvider>
      </EnvironmentContextProvider>
    </div>
  );
}

export default App;