
// styling
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './ChartLayout.css'

// page imports
import React, { useContext, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

// components
import TimeSeries from './TimeSeries';

// contexts
import { DataContext } from '../../contexts/DataContext';

// component for the draggable chart grid
const ChartLayout = () => {

    const ResponsiveGridLayout = WidthProvider(Responsive);

    // consume data from DataContext
    const { selectedCharts } = useContext(DataContext);

    // initial layout for grid
    const [gridLayout] = useState([
        {
            i: '0', isBounded: true, isDraggable: true, isResizable: true, resizeHandles: ['se'],
            x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2
        },
        {
            i: '1', isBounded: false, isDraggable: true, isResizable: true, resizeHandles: ['se'],
            x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2,
        },
        {
            i: '2', isBounded: false, isDraggable: true, isResizable: true, resizeHandles: ['se'],
            x: 0, y: 1, w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2,
        },
        {
            i: '3', isBounded: false, isDraggable: true, isResizable: true, resizeHandles: ['se'],
            x: 1, y: 1, w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2,
        }
    ]);

    // constructed charts
    const charts = selectedCharts.map((chart, index) => {

        return (<div className="time-series" data-grid={gridLayout[index]} key={index}>
            <TimeSeries chartID={chart.chartID} building={chart.building} room={chart.room} capacity={chart.capacity} />
        </div>)
    });


    // returns chart grid and all charts within
    return (
        <ResponsiveGridLayout className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
            rowHeight={500}
            compactType={"vertical"}
            useCSSTransforms={false}
            measureBeforeMount={true}
        >
            {charts}

        </ResponsiveGridLayout >
    );
}

export default ChartLayout;