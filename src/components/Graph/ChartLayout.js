
// styling
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// page imports
import React, { useContext, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TimeSeries from './TimeSeries';

// contexts
import { DataContext } from '../../contexts/DataContext';

// component for the draggable chart grid
const ChartLayout = () => {

    const ResponsiveGridLayout = WidthProvider(Responsive);

    // consume data from DataContext
    const { selectedCharts } = useContext(DataContext);

    // initial layout for grid
    const [gridLayout, setGridLayout] = useState([
        {
            i: '0', isBounded: true, isDraggable: true, isResizable: true, resizeHandles: [['se']],
            x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2,
        },
        {
            i: '1', isBounded: false, isDraggable: true, isResizable: true, resizeHandles: [['se']],
            x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2,
        },
        {
            i: '2', isBounded: false, isDraggable: true, isResizable: true, resizeHandles: [['se']],
            x: 0, y: 1, w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2,
        },
        {
            i: '3', isBounded: false, isDraggable: true, isResizable: true, resizeHandles: [['se']],
            x: 1, y: 1, w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2,
        }
    ]);

    // constructed charts
    const charts = selectedCharts.map((chart) => {
        return (<div className="time-series" data-grid={gridLayout[chart.chartID]} key={chart.chartID}><TimeSeries building={chart.building} room={chart.room} /></div>)
    });


    // updates grid state on chart movement/resize
    const onLayoutChange = (layout) => {
        // console.log(gridLayout);
        //console.log(layout);
        //setGridLayout(layout);
    };


    // returns the grid and its charts
    return (
        <ResponsiveGridLayout className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
            rowHeight={500}
            compactType={"vertical"}
            useCSSTransforms={false}
            measureBeforeMount={true}
            onLayoutChange={onLayoutChange}
        >

            {charts}

        </ResponsiveGridLayout >
    );
}

export default ChartLayout;