import PullUsers from '../../../utilities/Administrator/PullUsers';
import axios from 'axios';

jest.mock('axios');

describe(("Axios user pulling functionality."), () => {

   it("Users are successfully pulled.", async () => {

      let response = {
         status: 200,
         statusText: 'OK'
      }

      axios.mockResolvedValue(response);

      const result = await PullUsers("testURL", "testToken");

      expect(result).toEqual(response);
   });

   it("Users fail to be pulled.", async () => {

      let response = {
         status: 400,
         message: 'Failed request.'
      }

      axios.mockRejectedValue(response);

      const result = await PullUsers("testURL", "testToken");

      expect(result instanceof Error).toBe(true);
   });
})