
// page imports
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

// contexts
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

// components
import AlertNotification from '../../../components/Notification/AlertNotification'

Enzyme.configure({ adapter: new Adapter() })


describe(("Alert Notification Component"), () => {

   it("Renders Correctly.", () => {

      const setShowAlertMock = jest.fn();

      const AlertNotificationWrapper = mount(
         <AuthenticationContext.Provider value={{ userAdminPermissions: true }}>
            <AlertNotification showAlert={true} setShowAlert={setShowAlertMock} title={"Test Title"} description={"Test Description"} />
         </AuthenticationContext.Provider>
      )

      expect(AlertNotificationWrapper).toBeTruthy();
   })
})