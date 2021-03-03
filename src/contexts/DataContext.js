
// page imports
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


// context that pulls data from backend and parses

export const DataContext = createContext();

const DataContextProvider = (props) => {

   // creates state: list of buildings
   const [buildingList, setBuildingList] = useState([]);

   // creates state: selected building
   const [building, setBuilding] = useState('');

   // creates state: list of rooms
   const [roomList, setRoomList] = useState([]);

   // creates state: selected room
   const [room, setRoom] = useState('');

   // creates state: list of counts
   const [countList, setCountList] = useState([]);


   // API pull and parse logic for buildings
   const getBuildings = async () => {

      try {
         const response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/api/data/buildings'
         });

         // successfully verified
         if (response.status === 200) {

            let buildingData = response.data;

            for (let buildingIndex = 0; buildingIndex < buildingData.data.length; buildingIndex++) {

               let buildingName = buildingData.data[buildingIndex];

               // let buildingName = buildingData.data[buildingIndex]["name"];

               // let buildingCount = buildingData.data[buildingIndex]["count"];

               // let buildingCapacity = buildingData.data[buildingIndex]["capacity"];

               // let buildingNumber = buildingData.data[buildingIndex]["number"];

               // let buildingCoords = buildingData.data[buildingIndex]["coordinates"];

               setBuildingList(buildingList => [...buildingList, {

                  buildingName: buildingName,

                  // static building count
                  buildingCount: 100,

                  // static building capacity
                  buildingCapacity: 2800,

                  // static building number
                  buildingNumber: 0,

                  // static coordinates
                  buildingCoords: [35.18580, -111.65508]
               }]);
            }
         }

         console.log("pulling building list");
      }

      // failed to pull building list
      catch {
         console.log("Failed to pull buildings");
      }
   };

   // API pull and parse logic for rooms in selected building
   const getRooms = async () => {

      // resets list of rooms when building is changed
      //setRoomList([]);
      let localRoomList = [];

      // tries to connect to database and verify account information
      try {
         const response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/api/data/building',
            params: {
               building: building
            }
         });

         // successfully verified
         if (response.status === 200) {

            let roomData = response.data.data;

            // compiles list of rooms
            for (let roomIndex = 0; roomIndex < roomData.length; roomIndex++) {

               let roomName = roomData[roomIndex]["endpoint"];

               if (localRoomList.indexOf(roomName) === -1) {

                  let roomCount = roomData[roomIndex]["count"];
                  let roomCapacity = roomData[roomIndex]["room_capacity"];

                  localRoomList.push({
                     room: roomName,
                     count: roomCount,
                     capacity: roomCapacity
                  });
               }
            }

            setRoomList(localRoomList);
         }

         console.log("pulling room list");
      }

      // failed to sign in
      catch {
         console.log("failed to pull rooms")
      }
   };


   // API pull and parse logic for counts and timestamps in selected room
   const getCounts = async () => {

      // resets counts and times for room when room is changed
      let localCountList = [];

      // tries to connect to database and verify account information
      try {
         const response = await axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/api/data/building',
            params: {
               building: building
            }
         });

         // successfully verified
         if (response.status === 200) {

            let countData = response.data.data;

            for (let countIndex = 0; countIndex < countData.length; countIndex++) {

               if (room === countData[countIndex]["endpoint"]) {

                  let roomCount = countData[countIndex]["count"];

                  // formats the date and adds to date list
                  let date = countData[countIndex]["timestamp"]['$date'];

                  let parsedDate = new Date(date);

                  let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} 
                     ${parsedDate.getHours()}:${parsedDate.getMinutes()}:${parsedDate.getSeconds()}`;

                  localCountList.push({
                     count: roomCount,
                     timestamp: dateString
                  });
               }
            }

            setCountList(localCountList);
         }

         console.log("pulling counts");
      }

      // failed to sign in
      catch {
         console.log("failed to pull counts")
      }
   };






   // updates components with pulled buildings from database
   useEffect(() => {
      getBuildings();
   }, [])

   // updates components with pulled rooms after building selection
   useEffect(() => {
      building !== '' && getRooms();
      room !== '' && getCounts();

      const interval = setInterval(() => {
         building !== '' && getRooms();
         room !== '' && getCounts();
      }, 5000);

      return () => clearInterval(interval);

   }, [room, building])


   return (
      <DataContext.Provider value={{
         buildingList, building, setBuilding, roomList, room, setRoom, countList, setCountList
      }}>
         { props.children}
      </DataContext.Provider>
   )
}

export default DataContextProvider