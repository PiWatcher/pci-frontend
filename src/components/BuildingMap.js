
// styling
import './BuildingMap.css';
import 'leaflet/dist/leaflet.css';

// page imports
import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// contexts
import { DataContext } from '../contexts/DataContext';


const BuildingMap = () => {

  // consumes data from DataContext
  const { buildingList, setBuilding, setRoom } = useContext(DataContext);

  // home coordinates for map on load
  const nauCoordinates = [35.18580, -111.65508];

  // constant for map's ability to zoom in/out on scroll
  const zoomStatus = true;

  // constant for base zoom distance on map load
  const zoomSet = 15;

  // icon customization
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [26, 38],
    iconAnchor: [14, 37],
    popupAnchor: [-2, -30],
    shadowSize: [40, 38],
    shadowAnchor: [14, 37]
  });

  L.Marker.prototype.options.icon = DefaultIcon;


  // pulls selection text from dropdown and passes it back to context
  const handleMapSelection = (building) => {
    setBuilding(building);
    setRoom('');
  }


  // returns a map container with markers of listed building coordinates
  return (
    <MapContainer center={nauCoordinates} zoom={zoomSet} scrollWheelZoom={zoomStatus}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {buildingList.map((item) => {
        return (
          <Marker position={item.buildingCoords}>
            <Popup>
              <div className="popup">
                <h3>{item.buildingName}</h3>
                <span>(Building #{item.buildingNumber})</span>
                <div>
                  <button className="select-building-button" onClick={() => handleMapSelection(item.buildingName)}>Select</button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

    </MapContainer >
  )
}

export default BuildingMap;
