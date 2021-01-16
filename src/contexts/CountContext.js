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
    const [ currentCount, setCurrentCount ] = useState(0);


    const getCounts = async () => {

        // resets counts and times for room when room is changed
        setCountList([]);
        setTimeList([]);

        // API call for counts
        const response = await axios('http://127.0.0.1:5000/api/'.concat(building));

        const mongoData = response.data;

        // parse data from room

        for (let index = 0; index < mongoData.data.length; index++) {
            
            let roomName = mongoData.data[index]['endpoint'];

            if (room === roomName) {
            
            // places count in count list
            setCountList(countList => [...countList, mongoData.data[index]['count']]);
            
            // formats the date and adds to date list
            let date = mongoData.data[index]['timestamp']['$date'];
            
            let parsedDate = new Date(date);

            let dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${parsedDate.getHours()}:${parsedDate.getMinutes()}:${parsedDate.getSeconds()}`;

            setTimeList (timeList => [...timeList, dateString]);
            }
        }

        
        // BUG: count card not rerendering on correct data change
        setCurrentCount (countList[countList.length - 1]);
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