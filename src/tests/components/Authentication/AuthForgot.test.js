import AuthForgot from '../../../components/Authentication/AuthForgot'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { EnvironmentContext } from '../../../contexts/EnvironmentContext';

Enzyme.configure({ adapter: new Adapter() })


// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const AuthForgotWrapper = mount(
        <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthForgot />
        </EnvironmentContext.Provider>
    )

    expect(AuthForgotWrapper).toBeTruthy();

})