import Dashboard from '../../../components/Dashboard/Dashboard'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { EnvironmentContext } from '../../../contexts/EnvironmentContext';
import { DataContext } from '../../../contexts/DataContext';

Enzyme.configure({ adapter: new Adapter() })



// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    global.URL.createObjectURL = () => { };

    const DashboardWrapper = mount(
        <EnvironmentContext.Provider value={{ baseURL: "testURL" }}>
            <DataContext.Provider value={{ selectedBuilding: "testBuilding" }}>
                <Dashboard />
            </DataContext.Provider>
        </EnvironmentContext.Provider>
    )

    expect(DashboardWrapper).toBeTruthy();
})