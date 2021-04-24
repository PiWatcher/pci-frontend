import ChangeUserPassword from '../../../Utilites/Authentication/ChangeUserPassword';
import axios from 'axios';

jest.mock('axios');

  describe(("Axios user change password functionality."), () => {

    it("User successfully changes password.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.post.mockResolvedValue(response);

      const result = await ChangeUserPassword("testURL", "testToken", "testPassword", "testNewPassword");

      expect(result).toEqual(response);
    });

    it("User fails to change password.", async () => {

      let response = {
        status: 400
      }

      axios.post.mockRejectedValue(response);

      const result = await ChangeUserPassword("testURL", "testToken", "testPassword", "testNewPassword");

      expect(result instanceof Error).toBeTruthy;
    });
  })