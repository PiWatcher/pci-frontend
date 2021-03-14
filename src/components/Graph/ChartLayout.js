
// styling
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// page imports
import React, { useContext } from 'react';

// contexts
import { DataContext } from '../../contexts/DataContext';

// components
import { Responsive, WidthProvider } from 'react-grid-layout';
import TimeSeries from './TimeSeries';


const ChartLayout = () => {

    const ResponsiveGridLayout = WidthProvider(Responsive);

    // consume data from DataContext
    const { selectedBuilding, selectedRooms } = useContext(DataContext);

    let gridLayout = ([
        { i: '0', x: 0, y: 0, w: 1, h: 1 },
        { i: '1', x: 1, y: 0, w: 1, h: 1 },
        { i: '2', x: 0, y: 1, w: 1, h: 1 },
        { i: '3', x: 1, y: 1, w: 1, h: 1 }
    ]);

    const charts = selectedRooms.map((room, index) => {
        return (<div className="time-series" data-grid={gridLayout[index]} key={index.toString()}><TimeSeries building={selectedBuilding} room={room} /></div>)
    });


    // sets but doesn't save
    const onLayoutChange = (layout) => {
        console.log(layout)
        gridLayout = layout;
        console.log(gridLayout);
    };


    // returns the entire dashboard and its child components
    return (
        <ResponsiveGridLayout className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
            rowHeight={500}
            compactType={"vertical"}
            resizeHandles={['se']}
            useCSSTransforms={false}
            measureBeforeMount={true}
            onLayoutChange={onLayoutChange}
        >

            {charts}

        </ResponsiveGridLayout >
    );
}

export default ChartLayout;