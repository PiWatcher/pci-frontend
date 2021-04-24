import PullUsers from '../../../Utilites/Admin/PullUsers';
import axios from 'axios';

  jest.mock('axios');

  describe(("Axios user pulling functionality."), () => {

    it("Users are successfully pulled.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.get.mockResolvedValue(response);

      const result = await PullUsers("testURL", "testToken");

      expect(result).toEqual(response);
    });

    it("Users fail to be pulled.", async () => {

      let response = {
        status: 400
      }

      axios.get.mockRejectedValue(response);

      const result = await PullUsers("testURL", "testToken");

      expect(result).toEqual(response);
    });
  })