import React from 'react';
import './SearchResult.css';

const SearchResult = (props) => {
  let room_list = []
  let bldg_data = props.campusData
  console.log("test: " + props.campusData.length)
  for (var i = 0; i < bldg_data.length; i++) {
    var room_name = bldg_data[i]['endpoint']
    console.log(room_name)
    if (!room_list.includes(room_name)) {
      room_list.push(room_name)
    } 
  }
  console.log(room_list)
  
  const options = room_list.map(room => (
    <li key={room}>
      {room}
    </li>
  ))

  return <ul>{options}</ul>
  //return null
}

export default SearchResult