
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// components
import UserList from '../../../components/Administrator/UserList';

Enzyme.configure({ adapter: new Adapter() })


describe(("UserList Component"), () => {


   it("Renders correctly.", () => {

      const pullUsersMock = jest.fn();

      const UserListWrapper = mount(
         <UserList users={[]} roles={[]} pullRoles={pullUsersMock} />
      )

      expect(UserListWrapper).toBeTruthy();
   })
})