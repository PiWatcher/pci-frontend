
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { DataContext } from '../../../contexts/DataContext';

// components
import Searchbar from '../../../components/Navigation/Searchbar';

Enzyme.configure({ adapter: new Adapter() })


describe(("Searchbar Component."), () => {

   it("Renders correctly.", () => {

      const setSelectedBuildingMock = jest.fn();

      const SearchbarWrapper = mount(
         <DataContext.Provider value={{ selectedBuilding: "Test Building", setSelectedBuilding: setSelectedBuildingMock }}>
            <Searchbar pulledBuildings={[]} />
         </DataContext.Provider>
      )

      expect(SearchbarWrapper).toBeTruthy();
   })
})