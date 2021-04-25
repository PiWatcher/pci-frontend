import PullBuildings from '../../../components/RestUtilities/Dashboard/PullBuildings';
import axios from 'axios';

jest.mock('axios');

describe(("Axios buildings pull functionality."), () => {

  it("Buildings are successfully pulled.", async () => {

    let response = {
      status: 200,
      statusText: 'OK'
    }

    axios.mockResolvedValue(response);

    const result = await PullBuildings("testURL", "testBuilding", "testRoom", "testCurrentQuery");

    expect(result).toEqual(response);
  });

  it("Buildings fail to be pulled.", async () => {

    let response = {
      status: 400,
      message: 'Failed request.'
    }

    axios.mockRejectedValue(response);

    const result = await PullBuildings("testURL", "testBuilding", "testRoom", "testCurrentQuery");

    expect(result instanceof Error).toBeTruthy;
  });
})