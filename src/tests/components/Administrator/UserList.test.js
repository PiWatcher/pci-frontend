import UserList from '../../../components/Administrator/UserList';
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

Enzyme.configure({ adapter: new Adapter() })

// test component if not props are passed down
test("RoleList renders correctly.", () => {

    const pullUsersMock = jest.fn();

    const UserListWrapper = mount(
        <UserList users={[]} roles={[]} pullRoles={pullUsersMock} />
    )

    expect(UserListWrapper).toBeTruthy();
});