import RoleList from '../../../components/Administrator/RoleList';
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

Enzyme.configure({ adapter: new Adapter() })


// test component if not props are passed down
test("RoleList renders correctly.", () => {

    const pullRolesMock = jest.fn();

    const RoleListWrapper = mount(
        <RoleList roles={[]} pullRoles={pullRolesMock} />
    )

    expect(RoleListWrapper).toBeTruthy();
});