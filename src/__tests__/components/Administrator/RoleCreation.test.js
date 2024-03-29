
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import RoleCreation from '../../../components/Administrator/RoleCreation';

Enzyme.configure({ adapter: new Adapter() })


describe(("Role Creation Component"), () => {

   it("Renders correctly.", () => {

      const pullRolesMock = jest.fn();

      const RoleCreationWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken" }}>
               <RoleCreation pullRoles={pullRolesMock} />
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(RoleCreationWrapper).toBeTruthy();

   })
})