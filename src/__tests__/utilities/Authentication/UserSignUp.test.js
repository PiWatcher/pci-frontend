import UserSignUp from '../../../utilities/Authentication/UserSignUp';
import axios from 'axios';

jest.mock('axios');

describe(("Axios user sign up functionality."), () => {

   it("User successfully signs up.", async () => {

      let response = {
         status: 200,
         statusText: 'OK'
      }

      axios.mockResolvedValue(response);

      const result = await UserSignUp("testURL", "testName", "testEmail", "testPassword");

      expect(result).toEqual(response);
   });

   it("User fails to sign up.", async () => {

      let response = {
         status: 400,
         message: 'Failed request.'
      }

      axios.mockRejectedValue(response);

      const result = await UserSignUp("testURL", "testName", "testEmail", "testPassword");

      expect(result instanceof Error).toBe(true);
   });
})