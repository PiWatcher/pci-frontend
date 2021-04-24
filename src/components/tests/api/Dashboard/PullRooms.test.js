import PullRooms from '../../../Utilites/Dashboard/PullRooms';
import axios from 'axios';

jest.mock('axios');

  describe(("Axios rooms pull functionality."), () => {

    it("Roomss are successfully pulled.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.post.mockResolvedValue(response);

      const result = await PullRooms("testURL", "testBuilding");

      expect(result).toEqual(response);
    });

    it("Rooms fail to be pulled.", async () => {

      let response = {
        status: 400
      }

      axios.post.mockRejectedValue(response);

      const result = await PullRooms("testURL", "testBuilding");

      expect(result instanceof Error).toBeTruthy;
    });
  })