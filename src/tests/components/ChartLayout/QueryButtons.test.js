import QueryButtons from '../../../components/ChartLayout/QueryButtons'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

Enzyme.configure({ adapter: new Adapter() })

// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const setCurrentQueryMock = jest.fn();

    const QueryButtonsWrapper = mount(
        <AuthenticationContext.Provider value={{ userAdminPermissions: true }}>
            <QueryButtons currentQuery={"testQuery"} setCurrentQuery={setCurrentQueryMock} loading={false} />
        </AuthenticationContext.Provider>
    )

    expect(QueryButtonsWrapper).toBeTruthy();
})