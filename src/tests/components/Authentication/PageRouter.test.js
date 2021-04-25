import PageRouter from '../../../components/Authentication/PageRouter'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

Enzyme.configure({ adapter: new Adapter() })


// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const PageRouterWrapper = mount(
        <AuthenticationContext.Provider value={{ userAdminPermissions: true, authStatus: true }}>
            <PageRouter />
        </AuthenticationContext.Provider>
    )

    expect(PageRouterWrapper).toBeTruthy();
})