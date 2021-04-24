import UserSignIn from '../../../Utilites/Authentication/UserSignIn';
import axios from 'axios';

jest.mock('axios');

  describe(("Axios user sign in functionality."), () => {

    it("User successfully signs in.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.post.mockResolvedValue(response);

      const result = await UserSignIn("testURL", "testEmail", "testPassword");

      expect(result).toEqual(response);
    });

    it("User fails to sign in.", async () => {

      let response = {
        status: 400
      }

      axios.post.mockRejectedValue(response);

      const result = await UserSignIn("testURL", "testEmail", "testPassword");

      expect(result instanceof Error).toBeTruthy;
    });
  })