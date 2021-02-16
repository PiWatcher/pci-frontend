
// page imports
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import bldgDataJSON from '../data/bldgData.json';


// context that pulls data from backend and parses

export const DataContext = createContext();

const DataContextProvider = (props) => {


   // NAU buildings data: name, number, coordinates
   const [bldgData, setBldgData] = useState(bldgDataJSON.buildings)

   // backend URL for database
   const dataURL = 'http://127.0.0.1:5000/api/';

   // creates state: list of buildings
   const [buildingList, setBuildingList] = useState([]);

   // creates state: selected building
   const [building, setBuilding] = useState('');

   // create state: building coordinates
   const [buildingCoordsList, setBuildingCoordsList] = useState([]);

   // create state: building coordinates
   const [buildingNumberList, setBuildingNumberList] = useState([]);

   // creates state: list of rooms
   const [roomList, setRoomList] = useState([]);

   // creates state: selected room
   const [room, setRoom] = useState('');

   // creates state: list of counts
   const [countList, setCountList] = useState([]);

   // creates state: list of timestamps
   const [timeList, setTimeList] = useState([]);

   // creates state: latest recorded count
   const [currentCount, setCurrentCount] = useState(0);

   // creates state: selected room capacity (currently hardcoded until backend provides)
   const [roomCapacity] = useState(400);


   // API pull and parse logic for buildings
   // const getBuildings = async () => {

   //    // hardcoded url until backend matures
   //    const response = await axios('http://127.0.0.1:5000/api/SICCS');

   //    const mongoData = response.data

   //    setBuildingList(buildingList => [...buildingList, {
   //       key: mongoData.building,
   //       text: mongoData.building,
   //       value: mongoData.building
   //    }]);
   // };


   // API pull and parse logic for building information (currently from JSON file, not backend)
   const getBuildings = () => {

      for (let buildingIndex = 0; buildingIndex < bldgData.length; buildingIndex++) {

         let buildingName = bldgData[buildingIndex]['name'];

         let buildingNumber = bldgData[buildingIndex]['number'];

         let buildingCoords = bldgData[buildingIndex]['coordinates'];

         setBuildingList(buildingList => [...buildingList, {
            key: buildingNumber,
            text: buildingName,
            value: buildingName
         }]);

         setBuildingNumberList(buildingNumberList => [...buildingNumberList, buildingNumber]);

         setBuildingCoordsList(buildingCoordsList => [...buildingCoordsList, buildingCoords]);
      }
   };


   // API pull and parse logic for rooms in selected building
   const getRooms = async () => {

      // resets list of rooms when building is changed
      setRoomList([]);

      // modular url based on building change
      const response = await axios(dataURL.concat(building), {}, {
         auth: {
            username: "admin",
            password: "piwatcher2020"
         }
      });

      const mongoData = response.data

      // BUG: repeats rooms (currently limited to first two for testing)

      // loop through rooms and adds to list for viewing
      for (let roomIndex = 0; roomIndex < 2; roomIndex++) {

         let roomName = mongoData.data[roomIndex]['endpoint'];

         if (roomList.indexOf(roomName) < 0) {
            setRoomList(roomList => [...roomList, roomName]);
         }
      }
   };


   // API pull and parse logic for counts and timestamps in selected room
   const getCounts = async () => {

      // resets counts and times for room when room is changed
      setCountList([]);
      setTimeList([]);

      // modular url based on building change
      const response = await axios(dataURL.concat(building), {}, {
         auth: {
            username: "admin",
            password: "piwatcher2020"
         }
      });

      const mongoData = response.data

      // parse data from room

      for (let index = 0; index < mongoData.data.length; index++) {

         let roomName = mongoData.data[index]['endpoint'];

         if (room === roomName) {

            // places count in count list
            setCountList(countList => [...countList, mongoData.data[index]['count']]);

            // formats the date and adds to date list
            let date = mongoData.data[index]['timestamp']['$date'];

            let parsedDate = new Date(date);

            let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} 
               ${parsedDate.getHours()}:${parsedDate.getMinutes()}:${parsedDate.getSeconds()}`;

            setTimeList(timeList => [...timeList, dateString]);
         }
      }

      // sets latest count of room into a variable
      setCurrentCount(countList[countList.length - 1]);

   };

   // updates components with pulled buildings from database
   useEffect(() => {
      getBuildings();
   }, [])

   // updates components with pulled rooms after building selection
   useEffect(() => {
      //building !== '' && getRooms();
   }, [building])

   // updates components with pulled counts after room selection
   useEffect(() => {
      //room !== '' && getCounts();
   }, [room])


   return (
      <DataContext.Provider value={{
         buildingList, buildingNumberList, buildingCoordsList,
         building, setBuilding, roomList, room, setRoom, countList, timeList, currentCount, roomCapacity
      }}>
         { props.children}
      </DataContext.Provider>
   )
}

export default DataContextProvider