
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import Auth from '../../../components/Authentication/Auth'
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })


describe(("Auth Component"), () => {

   it("Renders correctly.", () => {

      const handleUserSignInMock = jest.fn();
      const handleUserSignUpMock = jest.fn();

      const AuthWrapper = mount(
         <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ handleUserSignIn: handleUserSignInMock, handleUserSignUp: handleUserSignUpMock }}>
               <Router>
                  <Auth />
               </Router>
            </AuthenticationContext.Provider>
         </EnvironmentContext.Provider>
      )

      expect(AuthWrapper).toBeTruthy();

   })
})