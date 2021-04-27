
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { DataContext } from '../../../contexts/DataContext';

// components
import ChartLayout from '../../../components/ChartLayout/ChartLayout'

Enzyme.configure({ adapter: new Adapter() })


describe(("ChartLayout Component"), () => {

   it("Renders correctly.", () => {

      const ChartLayoutWrapper = mount(
         <DataContext.Provider value={{ selectedCharts: [] }}>
            <ChartLayout />
         </DataContext.Provider>
      )

      expect(ChartLayoutWrapper).toBeTruthy();
   })
})