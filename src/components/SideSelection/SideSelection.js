//styling
import "./SideSelection.css"

// page imports
import React, { useContext} from 'react';

// components
import RoomList from './RoomList';
import BuildingInfo from './BuildingInfo';


// contexts
import { DataContext } from '../../contexts/DataContext';

// component for sidebar and its child components
const SideSelection = (props) => {

    const { pulledRooms } = props;

    // consume context
    const { selectedBuilding } = useContext(DataContext);

    // returns side selection component and its children
    return (
        <div className="room-list-container">
            <BuildingInfo selectedBuilding={selectedBuilding} />
            <RoomList selectedBuilding={selectedBuilding} pulledRooms={pulledRooms} />
        </div>
    )
}

export default SideSelection;