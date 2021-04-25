import Auth from '../../../components/Authentication/Auth'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { BrowserRouter as Router } from 'react-router-dom';

import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

Enzyme.configure({ adapter: new Adapter() })


// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const handleUserSignInMock = jest.fn();
    const handleUserSignUpMock = jest.fn();

    const AuthWrapper = mount(
        <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ handleUserSignIn: handleUserSignInMock, handleUserSignUp: handleUserSignUpMock }}>
                <Router>
                    <Auth />
                </Router>
            </AuthenticationContext.Provider>
        </EnvironmentContext.Provider>
    )

    expect(AuthWrapper).toBeTruthy();

})