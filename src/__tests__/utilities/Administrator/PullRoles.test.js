import PullRoles from '../../../utilities/Administrator/PullRoles';
import axios from 'axios';

jest.mock('axios');

describe(("Axios user pulling functionality."), () => {

   it("Roles are successfully pulled.", async () => {

      let response = {
         status: 200,
         statusText: 'OK'
      }

      axios.mockResolvedValue(response);

      const result = await PullRoles("testURL", "testToken");

      expect(result).toEqual(response);
   });

   it("Roles fail to be pulled.", async () => {

      let response = {
         status: 400,
         message: 'Failed request.'
      }

      axios.mockRejectedValue(response);

      const result = await PullRoles("testURL", "testToken");

      expect(result instanceof Error).toBe(true);
   });
})