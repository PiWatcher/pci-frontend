import UserSignUp from '../../../Utilites/Authentication/UserSignUp';
import axios from 'axios';

jest.mock('axios');

  describe(("Axios user sign up functionality."), () => {

    it("User successfully signs up.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.post.mockResolvedValue(response);

      const result = await UserSignUp("testURL", "testName", "testEmail", "testPassword");

      expect(result).toEqual(response);
    });

    it("User fails to sign up.", async () => {

      let response = {
        status: 400
      }

      axios.post.mockRejectedValue(response);

      const result = await UserSignUp("testURL", "testName", "testEmail", "testPassword");

      expect(result instanceof Error).toBeTruthy;
    });
  })