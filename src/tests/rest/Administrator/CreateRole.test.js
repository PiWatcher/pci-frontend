import CreateRole from '../../../components/RestUtilities/Administrator/CreateRole';
import axios from 'axios';

jest.mock('axios');

describe(("Axios role creation functionality."), () => {

    it("Role is created successfully.", async () => {

        let response = {
            status: 200,
            statusText: 'OK'
        }

        axios.mockResolvedValue(response);

        const result = await CreateRole("testURL", "testToken", "testRoleName", "testIsAdmin", "testCanViewRaw");

        expect(result).toEqual(response);
    });

    it("Role fails to be created.", async () => {

        let response = {
            status: 400,
            message: 'Failed request.'
        }

        axios.mockRejectedValue(response);

        const result = await CreateRole("testURL", "testToken", "testRoleName", "testIsAdmin", "testCanViewRaw");

        expect(result instanceof Error).toBeTruthy();
    });
})