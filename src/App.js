
// styling
import './App.css';

// page imports
import React from 'react';

// contexts
import AuthContextProvider from './contexts/AuthContext';

// components
import PageRouter from './components/PageRouter';


const App = () => {

  return (
    <div className="App">
      <AuthContextProvider>

        <div className="content">
          <PageRouter />
        </div>

      </AuthContextProvider>
    </div>
  );
}

export default App;