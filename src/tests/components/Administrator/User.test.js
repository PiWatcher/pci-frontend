import User from '../../../components/Administrator/User';
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

Enzyme.configure({ adapter: new Adapter() })


// test component if not props are passed down
test("User renders correctly.", () => {

    const pullUsersMock = jest.fn();

    const UserWrapper = mount(
        <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken" }}>
                <User name="testName" isAdmin={true} canViewRaw={true} pullUsers={pullUsersMock} />
            </AuthenticationContext.Provider>
        </EnvironmentContext.Provider>
    )

    expect(UserWrapper).toBeTruthy();

})