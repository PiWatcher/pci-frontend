
// page imports
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


// context that pulls data from backend and parses
export const DataContext = createContext();

const DataContextProvider = (props) => {

   // production base url
   const baseURL = "cscap1.iot.nau.edu";

   //development base url
   //const baseURL = "localhost";

   // creates state: selected building
   const [building, setBuilding] = useState('');

   // creates state: selected room
   const [room, setRoom] = useState('');

   // creates state: list of buildings pulled from endpoint
   const [buildingList, setBuildingList] = useState([]);

   // creates state: list of rooms pulled from endpoint
   const [roomList, setRoomList] = useState([]);

   // creates state: list of counts and timestamps
   const [countList, setCountList] = useState([]);

   // API pull and parse logic for buildings
   const getBuildings = async () => {

      // tries to pull and parse building data
      try {
         const response = await axios({
            method: 'get',
            url: `http://${baseURL}:5000/api/data/buildings`
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            let buildingData = response.data;

            let localBuildingList = [];

            // compiles list of buildings
            for (let buildingIndex = 0; buildingIndex < buildingData.data.length; buildingIndex++) {

               let buildingName = buildingData.data[buildingIndex];

               // let buildingName = buildingData.data[buildingIndex]["name"];

               // let buildingCount = buildingData.data[buildingIndex]["count"];

               // let buildingCapacity = buildingData.data[buildingIndex]["capacity"];

               // let buildingNumber = buildingData.data[buildingIndex]["number"];

               // let buildingCoords = buildingData.data[buildingIndex]["coordinates"];


               // creates building object and pushes to list 
               localBuildingList.push({

                  // name of building
                  buildingName: buildingName,

                  // static building count
                  buildingCount: 1200,

                  // static building capacity
                  buildingCapacity: 2800,

                  // static building number
                  buildingNumber: 0,

                  // static coordinates
                  buildingCoords: [35.18580, -111.65508]
               });
            }

            // sort buildings alphabetically
            localBuildingList = localBuildingList.sort(function (a, b) {
               return a.buildingName.localeCompare(b.buildingName, undefined, {
                  numeric: false,
                  sensitivity: 'base'
               });
            });

            // sets state to sorted list of buildings
            setBuildingList(localBuildingList);
         }

         console.log("Pulled building list.");
      }

      // failed to pull and parse the building list
      catch {
         console.log("Failed to pull buildings.");
      }
   };


   // API pull and parse logic for rooms in selected building
   const getRooms = async () => {

      let localRoomList = [];

      // tries to pull and parse building data
      try {
         const response = await axios({
            method: 'get',
            url: `http://${baseURL}:5000/api/data/building`,
            params: {
               building: building
            }
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            let roomData = response.data.data;

            // compiles list of rooms (from end of data source for latest count)
            for (let roomIndex = roomData.length - 1; roomIndex >= 0; roomIndex--) {

               // console.log(localRoomList);

               let roomName = roomData[roomIndex]["endpoint"];

               // adds room to list if not already within
               if (localRoomList.map(function (item) { return item.room; }).indexOf(roomName) === -1) {

                  let roomCount = roomData[roomIndex]["count"];
                  let roomCapacity = roomData[roomIndex]["room_capacity"];

                  // creates building object and pushes to list 
                  localRoomList.push({
                     room: roomName,
                     count: roomCount,
                     capacity: roomCapacity
                  });
               }
            }

            // sorts rooms in order
            localRoomList = localRoomList.sort(function (a, b) {
               return a.room.localeCompare(b.room, undefined, {
                  numeric: true,
                  sensitivity: 'base'
               });
            });

            // sets state to sorted list of rooms
            setRoomList(localRoomList);
         }

         console.log("Pulled room list.");
      }

      // failed to sign in
      catch {
         console.log("Failed to pull rooms.")
      }
   };


   // API pull and parse logic for counts and timestamps
   const getCounts = async () => {

      let localCountList = [];

      // tries to pull and parse selected room data
      try {
         const response = await axios({
            method: 'get',
            url: `http://${baseURL}:5000/api/data/building`,
            params: {
               building: building
            }
         });

         // successfully connected to endpoint and pulled data
         if (response.status === 200) {

            let countData = response.data.data;

            // compiles list of counts and timestamps (from beginning of data source)
            for (let countIndex = 0; countIndex < countData.length; countIndex++) {

               if (room === countData[countIndex]["endpoint"]) {

                  let roomCount = countData[countIndex]["count"];

                  // formats the date
                  let date = countData[countIndex]["timestamp"]['$date'];

                  let parsedDate = new Date(date);

                  let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${addZero(parsedDate.getHours())}:${addZero(parsedDate.getMinutes())}:${addZero(parsedDate.getSeconds())}`;

                  // creates count/timestamp object and pushes to list
                  localCountList.push({
                     count: roomCount,
                     timestamp: dateString
                  });
               }
            }

            // sets state to counts/timestamps for selected room
            setCountList(localCountList);
         }

         console.log("Pulling counts.");
      }

      // failed to sign in
      catch {
         console.log("Failed to pull counts.")
      }
   };

   // add zero to the time if single digit
   const addZero = (time) => {
      if (time < 10) {
         time = "0" + time;
      }
      return time;
   }


   // pulls buildings on initial page load
   useEffect(() => {
      getBuildings();
   }, [])


   // updates components with pulled rooms after building selection
   useEffect(() => {

      // gets rooms when a building is selected
      building !== '' && getRooms();

      // gets counts whena room is selected
      room !== '' && getCounts();

      // five seconds interval for data refresh 
      const interval = setInterval(() => {
         building !== '' && getRooms();
         room !== '' && getCounts();
      }, 5000);

      return () => clearInterval(interval);

   }, [building, room])


   return (
      <DataContext.Provider value={{
         buildingList, building, setBuilding, roomList, room, setRoom, countList, setCountList
      }}>
         { props.children}
      </DataContext.Provider>
   )
}

export default DataContextProvider
