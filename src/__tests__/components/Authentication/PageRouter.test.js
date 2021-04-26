
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import PageRouter from '../../../components/Authentication/PageRouter'

Enzyme.configure({ adapter: new Adapter() })


describe(("PageRouter Component"), () => {

   it("Renders correctly.", () => {

      const PageRouterWrapper = mount(
         <AuthenticationContext.Provider value={{ userAdminPermissions: true, authStatus: true }}>
            <PageRouter />
         </AuthenticationContext.Provider>
      )

      expect(PageRouterWrapper).toBeTruthy();
   })
})