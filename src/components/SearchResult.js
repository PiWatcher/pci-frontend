import React from 'react';
import './SearchResult.css';

const SearchResult = (props) => {
  let room_list = []
  console.log(props.campusData)
  console.log(props.campusData.length)
  for (var i = 0; i < props.campusData.length; i++)
    var room_name = props.campusData[i]['endpoint'].toString()
    console.log(room_name)
    if (!room_list.includes(room_name))
      room_list.push(room_name)
  console.log(room_list)
  const options = room_list.map(room => (
    <li>
      {room}
    </li>
  ))

  return <ul>{options}</ul>
  //return null
}

export default SearchResult