
// page imports
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { DataContext } from '../../../contexts/DataContext';

// components
import Dashboard from '../../../components/Dashboard/Dashboard'
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })


describe(("Dashboard Component"), () => {

   it("Renders correctly.", () => {

      const handleUserSignOutMock = jest.fn();

      const DashboardWrapper = shallow(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userAdminPermissions: true, handleUserSignOut: handleUserSignOutMock }}>
               <DataContext.Provider value={{ selectedBuilding: "testBuilding" }}>
                  <Router>
                     <Dashboard />
                  </Router>
               </DataContext.Provider>
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(DashboardWrapper).toBeTruthy();
   })
})