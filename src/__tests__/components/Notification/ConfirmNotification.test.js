
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import ConfirmNotification from '../../../components/Notification/ConfirmNotification'

Enzyme.configure({ adapter: new Adapter() })


describe(("Confirm Notification Component"), () => {

   it("Renders correctly.", () => {

      const setShowAlertMock = jest.fn();
      const onConfirmMock = jest.fn();

      const ConfirmNotificationWrapper = mount(
         <AuthenticationContext.Provider value={{ userAdminPermissions: true }}>
            <ConfirmNotification showAlert={true} setShowAlert={setShowAlertMock} onConfirm={onConfirmMock} title={"Test Title"} description={"Test Description"} />
         </AuthenticationContext.Provider>
      )

      expect(ConfirmNotificationWrapper).toBeTruthy();
   })
})