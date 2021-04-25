import ChangePassword from '../../../components/Settings/ChangePassword'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

Enzyme.configure({ adapter: new Adapter() })

// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const QueryButtonsWrapper = mount(
        <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken" }}>
                <ChangePassword />
            </AuthenticationContext.Provider>
        </EnvironmentContext.Provider>
    )

    expect(QueryButtonsWrapper).toBeTruthy();
})