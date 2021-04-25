import RoleCreation from '../../../components/Administrator/RoleCreation';
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

Enzyme.configure({ adapter: new Adapter() })


// test component if not props are passed down
test("User renders correctly.", () => {

    const pullRolesMock = jest.fn();

    const RoleCreationWrapper = mount(
        <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken" }}>
                <RoleCreation pullRoles={pullRolesMock} />
            </AuthenticationContext.Provider>
        </EnvironmentContext.Provider>
    )

    expect(RoleCreationWrapper).toBeTruthy();

})