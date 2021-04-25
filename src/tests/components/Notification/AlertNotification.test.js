import AlertNotification from '../../../components/Notification/AlertNotification'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

Enzyme.configure({ adapter: new Adapter() })

// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const setShowAlertMock = jest.fn();

    const AlertNotificationWrapper = mount(
        <AuthenticationContext.Provider value={{ userAdminPermissions: true }}>
            <AlertNotification showAlert={true} setShowAlert={setShowAlertMock} title={"Test Title"} description={"Test Description"} />
        </AuthenticationContext.Provider>
    )

    expect(AlertNotificationWrapper).toBeTruthy();
})