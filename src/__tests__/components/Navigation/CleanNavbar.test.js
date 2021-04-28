// page imports
import React from 'react'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import CleanNavbar from '../../../components/Navigation/CleanNavbar'

// components
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { DataContext } from '../../../contexts/DataContext';
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })

afterEach(() => {
   jest.clearAllMocks();
});


describe(("Clean Navbar Component"), () => {

   it("Renders correctly.", () => {

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

   it("Signs out correctly", () => {

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