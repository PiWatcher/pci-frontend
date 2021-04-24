import ChangeUserPassword from '../../../Utilities/Settings/ChangeUserPassword';
import axios from 'axios';

jest.mock('axios');

describe(("Axios user change password functionality."), () => {

  it("User successfully changes password.", async () => {

    let response = {
      status: 200,
      statusText: 'OK'
    }

    axios.mockResolvedValue(response);

    const result = await ChangeUserPassword("testURL", "testToken", "testPassword", "testNewPassword");

    expect(result).toEqual(response);
  });

  it("User fails to change password.", async () => {

    let response = {
      status: 400,
      message: 'Failed request.'
    }

    axios.mockRejectedValue(response);

    const result = await ChangeUserPassword("testURL", "testToken", "testPassword", "testNewPassword");

    expect(result instanceof Error).toBeTruthy;
  });
})