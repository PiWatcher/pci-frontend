import ChartLayout from '../../../components/ChartLayout/ChartLayout'
import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import { DataContext } from '../../../contexts/DataContext';

Enzyme.configure({ adapter: new Adapter() })

// test component if not props are passed down
test("Admin settings renders correctly.", () => {

    const ChartLayoutWrapper = mount(
        <DataContext.Provider value={{ selectedCharts: [] }}>
            <ChartLayout />
        </DataContext.Provider>
    )

    expect(ChartLayoutWrapper).toBeTruthy();
})