import DeleteRole from '../../../Utilites/Admin/DeleteRole';
import axios from 'axios';

jest.mock('axios');

  describe(("Axios role deletion functionality."), () => {

    it("Role successfully deletes.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.delete.mockResolvedValue(response);

      const result = await DeleteRole("testURL", "testToken", "testRole");

      expect(result).toEqual(response);
    });

    it("Role fails to delete.", async () => {

      let response = {
        status: 400
      }

      axios.delete.mockRejectedValue(response);

      const result = await DeleteRole("testURL", "testToken", "testRole");

      expect(result).toEqual(false);
    });
  })