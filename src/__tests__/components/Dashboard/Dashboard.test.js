
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { DataContext } from '../../../contexts/DataContext';

// components
import Dashboard from '../../../components/Dashboard/Dashboard'

Enzyme.configure({ adapter: new Adapter() })


describe(("Dashboard Component"), () => {

   it("Renders correctly.", () => {

      global.URL.createObjectURL = jest.fn(() => 'testURL');

      const DashboardWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <DataContext.Provider value={{ selectedBuilding: "testBuilding" }}>
               <Dashboard />
            </DataContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(DashboardWrapper).toBeTruthy();
   })
})