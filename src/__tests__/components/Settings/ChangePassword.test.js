
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import ChangePassword from '../../../components/Settings/ChangePassword'

Enzyme.configure({ adapter: new Adapter() })

describe(("Change Password Component"), () => {

   it("Renders correctly.", () => {

      const QueryButtonsWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken" }}>
               <ChangePassword />
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(QueryButtonsWrapper).toBeTruthy();
   })
})