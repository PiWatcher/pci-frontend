
// styling
import './Dashboard.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// page imports
import React, { useContext, useState, useEffect } from 'react';


// contexts

import { DataContext } from '../contexts/DataContext';

// components
import Navbar from './Navbar';
import RoomList from './RoomList';
import LineGraph from './LineGraph';
import TimeCard from './TimeCard';
import CountCard from './CountCard';
import { Responsive, WidthProvider } from 'react-grid-layout';


const Dashboard = () => {

   const ResponsiveGridLayout = WidthProvider(Responsive);

   // consume data from DataContext
   const { selectedBuilding, selectedRooms } = useContext(DataContext);

   const [charts, setCharts] = useState([]);


   const availableHandles = ["sw", "nw", "se", "ne"];

   const layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 1 },
      { i: 'b', x: 1, y: 0, w: 6, h: 8 },
      { i: 'c', x: 0, y: 6, w: 1, h: 1 },
      { i: 'd', x: 6, y: 6, w: 1, h: 1 }
   ];

   const createCharts = () => {

      let localCharts = selectedRooms.map((item, index) =>
         <div className="chart-div" key={index.toString()}> <LineGraph room={item} /> </div>);

      setCharts(localCharts);

   }


   useEffect(() => {

      createCharts();

   }, [selectedRooms])


   // returns the entire dashboard and its child components
   return (
      <div className="dashboard-container">

         <Navbar />

         {/* <div className="time-card-container">
            <TimeCard />
         </div> */}

         <div className="data-row">
            <div className="line-graph-container">

               <ResponsiveGridLayout className="layout" layouts={layout}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
                  rowHeight={500}
                  compactType={'vertical'}
                  resizeHandles={['sw', 'nw', 'se', 'ne']}>

                  {charts}

               </ResponsiveGridLayout>

            </div>

            {selectedBuilding !== '' ?
               <div className="room-list-container">
                  <CountCard />
                  <RoomList />
               </div>
               : null
            }

         </div >
      </div >
   );
}

export default Dashboard;