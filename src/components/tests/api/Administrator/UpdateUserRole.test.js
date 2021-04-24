import UpdateUserRole from '../../../Utilites/Admin/UpdateUserRole';
import axios from 'axios';

  jest.mock('axios');

  describe(("Axios user role updating functionality."), () => {

    it("User role successfully updates.", async () => {

      let response = {
        status: 200,
        statusText: 'OK'
      }

      axios.post.mockRejectedValue(response);

      const result = await UpdateUserRole("testURL", "testToken", "testEmail", "testRole");

      expect(result).toEqual(response);
    });

    it("User role fails to update.", async () => {

      let response = {
        status: 400
      }

      axios.post.mockRejectedValue(response);

      const result = await UpdateUserRole("testURL", "testToken", "testEmail", "testRole");

      expect(result).toEqual(response);
    });
  })