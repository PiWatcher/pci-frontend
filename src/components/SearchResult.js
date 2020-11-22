import React from 'react';
import './SearchResult.css';

const SearchResult = (props) => {
  let room_list = []
  let bldg_data = props.campusData
  console.log("test: " + props.campusData.length)
  for (var i = 0; i < bldg_data.length; i++) {
    var room_name = bldg_data[i]['endpoint']
    var name1 = room_name.split('-')[0]
    var name2 = room_name.split('-')[1]
    name1 = name1.charAt(0).toUpperCase() + name1.slice(1)
    room_name = name1 + " " + name2
    console.log(room_name)
    if (!room_list.includes(room_name)) {
      room_list.push(room_name)
    } 
  }
  console.log(room_list)
  
  const options = room_list.map(room => (
    
    <li key={room}>
      <button onClick="console.log({room})">{room}</button>
    </li>
  ))

  return <ul>{options}</ul>
  //return null
}

export default SearchResult