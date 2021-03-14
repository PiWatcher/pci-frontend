
// styling
import './App.css';

// page imports
import React from 'react';

// contexts
import AuthContextProvider from './contexts/AuthContext';
import DataContextProvider from './contexts/DataContext';

// components
import PageRouter from './components/Authentication/PageRouter';


const App = () => {

  return (
    <div className="App">
      <AuthContextProvider>
        <DataContextProvider>

          <div className="content">
            <PageRouter />
          </div>

        </DataContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;