import TokenSignIn from '../../../Utilites/Authentication/TokenSignIn';
import axios from 'axios';

jest.mock('axios');

  describe(("Axios user token sign in functionality."), () => {

    it("User successfully signs in with token.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.post.mockResolvedValue(response);

      const result = await TokenSignIn("testURL", "testToken");

      expect(result).toEqual(response);
    });

    it("User fails to sign in with token.", async () => {

      let response = {
        status: 400
      }

      axios.post.mockRejectedValue(response);

      const result = await TokenSignIn("testURL", "testToken");

      expect(result instanceof Error).toBeTruthy;
    });
  })