
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import User from '../../../components/Administrator/User';

Enzyme.configure({ adapter: new Adapter() })


describe(("User Component"), () => {

   it("Renders correctly.", () => {

      const pullUsersMock = jest.fn();

      const UserWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken" }}>
               <User name="testName" isAdmin={true} canViewRaw={true} pullUsers={pullUsersMock} />
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(UserWrapper).toBeTruthy();

   })
})