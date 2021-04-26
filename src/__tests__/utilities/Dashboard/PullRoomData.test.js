import PullRoomData from '../../../utilities/Dashboard/PullRoomData';
import axios from 'axios';

jest.mock('axios');

describe(("Axios room data pull functionality."), () => {

   it("Room data is successfully pulled.", async () => {

      let response = {
         status: 200,
         statusText: 'OK'
      }

      axios.mockResolvedValue(response);

      const result = await PullRoomData("testURL");

      expect(result).toEqual(response);
   });

   it("Room data fails to be pulled.", async () => {

      let response = {
         status: 400,
         message: 'Failed request.'
      }

      axios.mockRejectedValue(response);

      const result = await PullRoomData("testURL");

      expect(result instanceof Error).toBe(true);
   });
})