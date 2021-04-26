
// page imports
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { DataContext } from '../../../contexts/DataContext';

// components
import PageRouter from '../../../components/Authentication/PageRouter'

Enzyme.configure({ adapter: new Adapter() })


describe(("PageRouter Component"), () => {

   it("Renders correctly.", () => {

      const PageRouterWrapper = shallow(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userAdminPermissions: true, authStatus: true }}>
               <DataContext.Provider value={{ selectedBuilding: "testBuilding" }}>
                  <PageRouter />
               </DataContext.Provider>
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(PageRouterWrapper).toBeTruthy();
   })
})