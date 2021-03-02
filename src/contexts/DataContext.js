
// page imports
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


// context that pulls data from backend and parses

export const DataContext = createContext();

const DataContextProvider = (props) => {

   // WIP: new data structure for building passing

   // const [buildingList, setBuildingList] = useState([{
   //    buildingInfo: {
   //       key: "",
   //       text: "",
   //       value: ""
   //    },
   //    buildingNumber: 0,
   //    buildingCoords: []
   // }]);

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
   const [roomCapacity] = useState(0);


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

               // let buildingNumber = buildingData.data[buildingIndex]["number"];

               // let buildingCoords = buildingData.data[buildingIndex]["coordinates"];

               setBuildingList(buildingList => [...buildingList, {
                  key: buildingName,
                  text: buildingName,
                  value: buildingName
               }]);

               setBuildingNumberList(buildingNumberList => [...buildingNumberList, 0]);

               setBuildingCoordsList(buildingCoordsList => [...buildingCoordsList, [35.18580, -111.65508]]);
            }
         }
      }

      // failed to pull building list
      catch {
         console.log("Failed to pull buildings");
      }
   };


   // API pull and parse logic for building information (currently from JSON file, not backend)
   // const getBuildings = () => {

   //    for (let buildingIndex = 0; buildingIndex < bldgData.length; buildingIndex++) {

   //       let buildingName = bldgData[buildingIndex]['name'];

   //       let buildingNumber = bldgData[buildingIndex]['number'];

   //       let buildingCoords = bldgData[buildingIndex]['coordinates'];

   //       setBuildingList(buildingList => [...buildingList, {
   //          key: buildingNumber,
   //          text: buildingName,
   //          value: buildingName
   //       }]);

   //       setBuildingNumberList(buildingNumberList => [...buildingNumberList, buildingNumber]);

   //       setBuildingCoordsList(buildingCoordsList => [...buildingCoordsList, buildingCoords]);
   //    }
   // };


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

            for (let roomIndex = 0; roomIndex < roomData.length; roomIndex++) {

               let roomName = roomData[roomIndex]["endpoint"];

               if (localRoomList.indexOf(roomName) === -1) {
                  localRoomList.push(roomName);
                  //setRoomList(roomList => [...roomList, roomName]);
               }
            }

            setRoomList(localRoomList);
         }

         console.log("pulling buildings");
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
      let localTimeList = [];

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
                  let roomCapacity = countData[countIndex]["room_capacity"];

                  // places count in count list
                  localCountList.push(roomCount);


                  // formats the date and adds to date list
                  let date = countData[countIndex]["timestamp"]['$date'];

                  let parsedDate = new Date(date);

                  let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} 
                     ${parsedDate.getHours()}:${parsedDate.getMinutes()}:${parsedDate.getSeconds()}`;


                  localTimeList.push(dateString);
               }
            }

            setCountList(localCountList);
            setTimeList(localTimeList);

            setCurrentCount(countList[countList.length - 1]);
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
         buildingList, buildingNumberList, buildingCoordsList,
         building, setBuilding, roomList, room, setRoom, countList, timeList, currentCount, roomCapacity
      }}>
         { props.children}
      </DataContext.Provider>
   )
}

export default DataContextProvider