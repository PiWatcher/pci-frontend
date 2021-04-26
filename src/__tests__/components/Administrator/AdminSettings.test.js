
// page imports
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { DataContext } from '../../../contexts/DataContext';

// components
import AdminSettings from '../../../components/Administrator/AdminSettings';
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })


describe(("Admin Settings Component"), () => {

   it("Renders correctly.", () => {

      const handleUserSignOutMock = jest.fn();
      const setSelectedBuildingMock = jest.fn();
      const setSelectedChartsMock = jest.fn();

      const AdminSettingsWrapper = shallow(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken", handleUserSignOut: handleUserSignOutMock }}>
               <DataContext.Provider value={{ setSelectedBuilding: setSelectedBuildingMock, setSelectedCharts: setSelectedChartsMock }}>
                  <Router>
                     <AdminSettings />
                  </Router>
               </DataContext.Provider>
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(AdminSettingsWrapper).toBeTruthy();

   })
})
