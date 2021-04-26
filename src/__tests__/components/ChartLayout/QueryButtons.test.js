
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import QueryButtons from '../../../components/ChartLayout/QueryButtons'

Enzyme.configure({ adapter: new Adapter() })


describe(("QueryButtons Component"), () => {

   it("Renders correctly.", () => {

      const setCurrentQueryMock = jest.fn();

      const QueryButtonsWrapper = mount(
         <AuthenticationContext.Provider value={{ userAdminPermissions: true }}>
            <QueryButtons currentQuery={"testQuery"} setCurrentQuery={setCurrentQueryMock} loading={false} />
         </AuthenticationContext.Provider>
      )

      expect(QueryButtonsWrapper).toBeTruthy();
   })
})