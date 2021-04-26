
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { DataContext } from '../../../contexts/DataContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import TimeSeries from '../../../components/ChartLayout/TimeSeries'

Enzyme.configure({ adapter: new Adapter() })


describe(("TimeSeries Component"), () => {

   it("Renders correctly.", () => {

      const setSelectedChartsMock = jest.fn();

      const TimeSeriesWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <DataContext.Provider value={{ selectedCharts: [], setSelectedCharts: setSelectedChartsMock }}>
               <AuthenticationContext.Provider value={{ userAdminPermissions: true, userViewRawData: true }}>
                  <TimeSeries />
               </AuthenticationContext.Provider>
            </DataContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(TimeSeriesWrapper).toBeTruthy();
   })
})