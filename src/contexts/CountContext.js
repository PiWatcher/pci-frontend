import React, { createContext, useState, useEffect, useContext } from 'react';
import { RoomContext } from './RoomContext';
import axios from 'axios';

// context that pulls and parses counts and timestamps for display in graph and count card

export const CountContext = createContext();

const CountContextProvider = (props) => {

    // consumes state from room selection
    const { building, room } = useContext( RoomContext );

    // creates state: list of counts
    const [ countList, setCountList ] = useState([]);

    // creates state: list of timestamps
    const [ timeList, setTimeList ] = useState([]);

    // creates state: latest recorded count
    const [ currentCount, setCurrentCount ] = useState(null);

    // set interval
    // set graph distance

    const getCounts = async () => {

        // BUG: must be a better way to do this
        // resets arrays
        var len = timeList.length

        for(var i = 0; i < len; i++) {
            countList.pop();
        }

        for(var k = 0; k < len; k++) {
            timeList.pop();
        }

        // API call for counts
        const response = await axios('http://127.0.0.1:5000/api/'.concat('SICCS'));  // .concat(building)

        const mongoData = response.data;

        // parse data from room

        for (var index = 0; index < mongoData.data.length; index++) {
            
            var roomName = mongoData.data[index]['endpoint'];

            if (room === roomName) {
            
            // places count in count list
            setCountList(countList => [...countList, mongoData.data[index]['count']]);
            
            // formats the date and adds to date list
            var date = mongoData.data[index]['timestamp']['$date'];
            
            var parsedDate = new Date(date);

            var dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${parsedDate.getHours()}:${parsedDate.getMinutes()}:${parsedDate.getSeconds()}`;

            setTimeList (timeList => [...timeList, dateString]);
            }
        }

        
        // BUG: current count does not reset
        setCurrentCount (currentCount => [currentCount, countList[countList.length - 1]]);
    };

    useEffect(() => {
        room !== '' && getCounts();
    }, [room])
    

    return (
        <CountContext.Provider value = {{ building, room, countList, timeList, currentCount }}>
            { props.children }
        </CountContext.Provider>
    )
}

export default CountContextProvider