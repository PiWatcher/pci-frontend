import UserSignIn from '../../../utilities/Authentication/UserSignIn';
import axios from 'axios';

jest.mock('axios');

describe(("Axios user sign in functionality."), () => {

   it("User successfully signs in.", async () => {

      let response = {
         status: 200,
         statusText: 'OK'
      }

      axios.mockResolvedValue(response);

      const result = await UserSignIn("testURL", "testEmail", "testPassword");

      expect(result).toEqual(response);
   });

   it("User fails to sign in.", async () => {

      let response = {
         status: 400,
         message: 'Failed request.'
      }

      axios.mockRejectedValue(response);

      const result = await UserSignIn("testURL", "testEmail", "testPassword");

      expect(result instanceof Error).toBe(true);
   });
})