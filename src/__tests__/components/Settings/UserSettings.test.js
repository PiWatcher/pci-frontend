
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { DataContext } from '../../../contexts/DataContext';

// components
import Settings from '../../../components/Settings/UserSettings'
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })


describe(("User Settings Component"), () => {

   it("Renders correctly.", () => {

      const handleUserSignOutMock = jest.fn();
      const setSelectedBuildingMock = jest.fn();
      const setSelectedChartsMock = jest.fn();

      const SettingsWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ handleUserSignOut: handleUserSignOutMock }}>
               <DataContext.Provider value={{ setSelectedBuilding: setSelectedBuildingMock, setSelectedCharts: setSelectedChartsMock }}>
                  <Router>
                     <Settings />
                  </Router>
               </DataContext.Provider>
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>

      )

      expect(SettingsWrapper).toBeTruthy();
   })
})