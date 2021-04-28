import DeleteRole from '../../../utilities/Administrator/DeleteRole';
import axios from 'axios';

jest.mock('axios');

describe(("Axios role deletion functionality."), () => {

   it("Role successfully deletes.", async () => {

      let response = {
         status: 200,
         statusText: 'OK'
      }

      axios.mockResolvedValue(response);

      const result = await DeleteRole("testURL", "testToken", "testRole");

      expect(result).toEqual(response);
   });

   it("Role fails to delete.", async () => {

      let response = {
         status: 400,
         message: 'Failed request.'
      }

      axios.mockRejectedValue(response);

      const result = await DeleteRole("testURL", "testToken", "testRole");

      expect(result instanceof Error).toBe(true);
   });
})