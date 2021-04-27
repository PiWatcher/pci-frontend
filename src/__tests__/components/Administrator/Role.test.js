
//page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import Role from '../../../components/Administrator/Role';

Enzyme.configure({ adapter: new Adapter() })


describe(("Role Component"), () => {

   it("Renders correctly.", () => {

      const pullRolesMock = jest.fn();

      const RoleWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken" }}>
               <Role name="testName" isAdmin={true} canViewRaw={true} pullRoles={pullRolesMock} />
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(RoleWrapper).toBeTruthy();

   })
})