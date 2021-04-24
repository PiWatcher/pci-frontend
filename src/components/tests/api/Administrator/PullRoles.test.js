import PullRoles from '../../../Utilites/Admin/PullRoles';
import axios from 'axios';

  jest.mock('axios');

  describe(("Axios user pulling functionality."), () => {

    it("Roles are successfully pulled.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.get.mockResolvedValue(response);

      const result = await PullRoles("testURL", "testToken");

      expect(result).toEqual(response);
    });

    it("Roles fail to be pulled.", async () => {

      let response = {
        status: 400
      }

      axios.get.mockRejectedValue(response);

      const result = await PullRoles("testURL", "testToken");

      expect(result).toEqual(response);
    });
  })