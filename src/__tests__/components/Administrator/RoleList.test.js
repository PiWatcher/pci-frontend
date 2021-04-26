
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// components
import RoleList from '../../../components/Administrator/RoleList';

Enzyme.configure({ adapter: new Adapter() })


describe(("RoleList Component"), () => {

   it("Renders correctly.", () => {

      const pullRolesMock = jest.fn();

      const RoleListWrapper = mount(
         <RoleList roles={[]} pullRoles={pullRolesMock} />
      )

      expect(RoleListWrapper).toBeTruthy();
   })
})