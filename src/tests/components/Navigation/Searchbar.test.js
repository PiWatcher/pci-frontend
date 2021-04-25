import Searchbar from '../../../components/Navigation/Searchbar';
import React from 'react';
import { DataContext } from '../../../contexts/DataContext';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

Enzyme.configure({ adapter: new Adapter() })

describe(("Searchbar rendering correctly."), () => {

    // test component if not props are passed down
    it("Navbar and children render correctly with no pulled buildings.", () => {

        const setSelectedBuildingMock = jest.fn();

        const SearchbarWrapper = mount(
            <DataContext.Provider value={{ selectedBuilding: "Test Building", setSelectedBuilding: setSelectedBuildingMock }}>
                <Searchbar pulledBuildings={[]} />
            </DataContext.Provider>
        )

        expect(SearchbarWrapper).toBeTruthy();
    })
})