import CleanNavbar from '../../../components/Navigation/CleanNavbar'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { DataContext } from '../../../contexts/DataContext';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';


Enzyme.configure({ adapter: new Adapter() })

afterEach(() => {
    jest.clearAllMocks();
});

describe(("Clean navbar renders correctly."), () => {

    // test component if not props are passed down
    it("Clean navbar renders correctly.", () => {

        const handleUserSignOutMock = jest.fn();
        const setSelectedBuildingMock = jest.fn();
        const setSelectedChartsMock = jest.fn();

        const CleanNavbarWrapper = mount(
            <AuthenticationContext.Provider value={{ handleUserSignOut: handleUserSignOutMock }}>
                <DataContext.Provider value={{ setSelectedBuilding: setSelectedBuildingMock, setSelectedCharts: setSelectedChartsMock }}>
                    <Router>
                        <CleanNavbar pulledBuildings={[]} />
                    </Router>
                </DataContext.Provider>
            </AuthenticationContext.Provider>
        )

        expect(CleanNavbarWrapper).toBeTruthy();
        expect(CleanNavbarWrapper.find('.clean-sign-out-div')).toHaveLength(1);
    })
})


describe(("Clean navbar signs out correctly."), () => {

    // test component if not props are passed down
    it("Clean navbar signs out correctly", () => {

        const handleUserSignOutMock = jest.fn();
        const setSelectedBuildingMock = jest.fn();
        const setSelectedChartsMock = jest.fn();

        const CleanNavbarWrapper = mount(
            <AuthenticationContext.Provider value={{ handleUserSignOut: handleUserSignOutMock }}>
                <DataContext.Provider value={{ setSelectedBuilding: setSelectedBuildingMock, setSelectedCharts: setSelectedChartsMock }}>
                    <Router>
                        <CleanNavbar pulledBuildings={["TestBuilding1, TestBuilding2, TestBuilding3"]} />
                    </Router>
                </DataContext.Provider>
            </AuthenticationContext.Provider>
        )

        const signOutButton = CleanNavbarWrapper.find('.clean-sign-out-div');

        signOutButton.simulate('click');

        expect(setSelectedBuildingMock).toHaveBeenCalledTimes(1);
        expect(setSelectedChartsMock).toHaveBeenCalledTimes(1);
        expect(handleUserSignOutMock).toHaveBeenCalledTimes(1);

    })
})