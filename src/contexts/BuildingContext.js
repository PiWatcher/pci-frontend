import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


// context that pulls buildings for display in search bar

export const BuildingContext = createContext();

const BuildingContextProvider = (props) => {

    // creates state: list of buildings
    const [ buildingList, setBuildingList ] = useState([]);

    // creates state: selected building
    const [ building, setBuilding ] = useState('');

    // API pull and parse logic for buildings
    const getBuildings = async () => {

        const response = await axios('http://127.0.0.1:5000/api/SICCS');

        const mongoData = response.data;

        setBuildingList (buildingList => [...buildingList, {key: mongoData.building, 
            text: mongoData.building, value: mongoData.building}]);
    }

    useEffect(() => {
        getBuildings();
    }, [])
    
    return (
        <BuildingContext.Provider value = {{ buildingList, building, setBuilding }}>
            { props.children }
        </BuildingContext.Provider>
    )
}

export default BuildingContextProvider