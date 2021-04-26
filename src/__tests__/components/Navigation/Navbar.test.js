
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { DataContext } from '../../../contexts/DataContext';

// components
import Navbar from '../../../components/Navigation/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })

afterEach(() => {
   jest.clearAllMocks();
});


describe(("Navbar Component"), () => {

   it("Renders correctly with admin privileges", () => {

      const handleUserSignOutMock = jest.fn();
      const setSelectedBuildingMock = jest.fn();
      const setSelectedChartsMock = jest.fn();

      const NavbarWrapper = mount(
         <AuthenticationContext.Provider value={{ userAdminPermissions: true, handleUserSignOut: handleUserSignOutMock }}>
            <DataContext.Provider value={{ setSelectedBuilding: setSelectedBuildingMock, setSelectedCharts: setSelectedChartsMock }}>
               <Router>
                  <Navbar pulledBuildings={[]} />
               </Router>
            </DataContext.Provider>
         </AuthenticationContext.Provider>
      )

      expect(NavbarWrapper).toBeTruthy();
      expect(NavbarWrapper.find('.settings-icon-div')).toHaveLength(1);
      expect(NavbarWrapper.find('.admin-icon-div')).toHaveLength(1);
      expect(NavbarWrapper.find('.sign-out-div')).toHaveLength(1);
   })

   it("Renders correctly without admin privileges.", () => {

      const handleUserSignOutMock = jest.fn();
      const setSelectedBuildingMock = jest.fn();
      const setSelectedChartsMock = jest.fn();

      const NavbarWrapper = mount(
         <AuthenticationContext.Provider value={{ userAdminPermissions: false, handleUserSignOut: handleUserSignOutMock }}>
            <DataContext.Provider value={{ setSelectedBuilding: setSelectedBuildingMock, setSelectedCharts: setSelectedChartsMock }}>
               <Router>
                  <Navbar pulledBuildings={["TestBuilding1, TestBuilding2, TestBuilding3"]} />
               </Router>
            </DataContext.Provider>
         </AuthenticationContext.Provider>
      )

      expect(NavbarWrapper).toBeTruthy();
      expect(NavbarWrapper.find('.settings-icon-div')).toHaveLength(1);
      expect(NavbarWrapper.find('.admin-icon-div')).toHaveLength(0);
      expect(NavbarWrapper.find('.sign-out-div')).toHaveLength(1);
   })

   it("Signs out correctly", () => {

      const handleUserSignOutMock = jest.fn();
      const setSelectedBuildingMock = jest.fn();
      const setSelectedChartsMock = jest.fn();

      const NavbarWrapper = mount(
         <AuthenticationContext.Provider value={{ userAdminPermissions: true, handleUserSignOut: handleUserSignOutMock }}>
            <DataContext.Provider value={{ setSelectedBuilding: setSelectedBuildingMock, setSelectedCharts: setSelectedChartsMock }}>
               <Router>
                  <Navbar pulledBuildings={["TestBuilding1, TestBuilding2, TestBuilding3"]} />
               </Router>
            </DataContext.Provider>
         </AuthenticationContext.Provider>
      )

      const signOutButton = NavbarWrapper.find('.sign-out-div');

      signOutButton.simulate('click');

      expect(setSelectedBuildingMock).toHaveBeenCalledTimes(1);
      expect(setSelectedChartsMock).toHaveBeenCalledTimes(1);
      expect(handleUserSignOutMock).toHaveBeenCalledTimes(1);

   })
})