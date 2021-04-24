import DeleteUser from '../../../Utilites/Admin/DeleteUser';
import axios from 'axios';

  jest.mock('axios');

  describe(("Axios user deleting functionality."), () => {

    it("User successfully deletes.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.delete.mockResolvedValue(response);

      const result = await DeleteUser("testURL", "testToken", "testEmail");

      expect(result).toEqual(response);
    });

    it("User fails to delete.", async () => {

      let response = {
        status: 400
      }

      axios.delete.mockRejectedValue(response);

      const result = await DeleteUser("testURL", "testToken", "testEmail");

      expect(result).toEqual(response);
    });
  })