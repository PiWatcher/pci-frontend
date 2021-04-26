
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';

// components
import AuthForgot from '../../../components/Authentication/AuthForgot'

Enzyme.configure({ adapter: new Adapter() })


describe(("AuthForgot Component"), () => {

   it("Renders correctly.", () => {

      const AuthForgotWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthForgot />
         </EnvironmentContext.Provider>
      )

      expect(AuthForgotWrapper).toBeTruthy();

   })
})