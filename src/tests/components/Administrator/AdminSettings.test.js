import AdminSettings from '../../../components/Administrator/AdminSettings';
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { BrowserRouter as Router } from 'react-router-dom';

import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';
import { DataContext } from '../../../contexts/DataContext';

Enzyme.configure({ adapter: new Adapter() })


// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const handleUserSignOutMock = jest.fn();
    const setSelectedBuildingMock = jest.fn();
    const setSelectedChartsMock = jest.fn();

    const AdminSettingsWrapper = mount(
        <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <AuthenticationContext.Provider value={{ userToken: "testToken", handleUserSignOut: handleUserSignOutMock }}>
                <DataContext.Provider value={{ setSelectedBuilding: setSelectedBuildingMock, setSelectedCharts: setSelectedChartsMock }}>
                    <Router>
                        <AdminSettings />
                    </Router>
                </DataContext.Provider>
            </AuthenticationContext.Provider>
        </EnvironmentContext.Provider>
    )

    expect(AdminSettingsWrapper).toBeTruthy();

})