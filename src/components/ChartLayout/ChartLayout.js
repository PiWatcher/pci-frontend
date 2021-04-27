
// styling
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './ChartLayout.css'

// page imports
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

// components
import TimeSeries from './TimeSeries';

// contexts
import { DataContext } from '../../contexts/DataContext';


/** 
* Component: ChartLayout
* 
* Handles the grid for the resizable and draggable charts
*/
const ChartLayout = () => {

   const {

      // {list} chart objects to be mapped in the grid layout
      selectedCharts

   } = useContext(DataContext);

   // {list} created TimeSeries components to be displayed
   const [charts, setCharts] = useState([])

   // {int} provides width of current window to resize grid accordingly
   const ResponsiveGridLayout = WidthProvider(Responsive);

   // {object} initial layout for grid
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


   /** 
   * Function: handleCreateCharts
   * 
   * Charts are constructed and mapped to a variable and set to state
   */
   const handleCreateCharts = useCallback(() => {

      const localCharts = selectedCharts.map((chart, index) => {

         return (
            <div className="time-series" data-grid={gridLayout[index]} key={index}>
               <TimeSeries chartID={chart.chartID} building={chart.building} room={chart.room} capacity={chart.capacity} />
            </div>
         )

      });

      setCharts(localCharts);

   }, [gridLayout, selectedCharts]);


   /** 
   * Function: useEffect
   * 
   * Calls handleCreateCharts on component creation
   */
   useEffect(() => {

      handleCreateCharts();

   }, [selectedCharts, handleCreateCharts])


   /** 
   * Return: ChartLayout JSX
   * 
   * Returns the layout for display in the browser
   */
   return (
      <ResponsiveGridLayout className="layout"
         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
         cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
         rowHeight={500}
         compactType={"vertical"}
         useCSSTransforms={true}
         measureBeforeMount={true}
      >
         {charts}

      </ResponsiveGridLayout >
   );
}

export default ChartLayout;