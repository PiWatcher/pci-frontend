import ConfirmNotification from '../../../components/Notification/ConfirmNotification'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

Enzyme.configure({ adapter: new Adapter() })

// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const setShowAlertMock = jest.fn();
    const onConfirmMock = jest.fn();

    const ConfirmNotificationWrapper = mount(
        <AuthenticationContext.Provider value={{ userAdminPermissions: true }}>
            <ConfirmNotification showAlert={true} setShowAlert={setShowAlertMock} onConfirm={onConfirmMock} title={"Test Title"} description={"Test Description"} />
        </AuthenticationContext.Provider>
    )

    expect(ConfirmNotificationWrapper).toBeTruthy();
})