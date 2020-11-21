import React, {Component} from 'react';
import './SearchResult.css';

const SearchResult = (props) => {
  return null
  if (props.roomData === '') return null
  const options = props.roomData.map(r => (
    <li>
      {r[0]}
    </li>
  ))
  return <ul>{options}</ul>
}

export default SearchResult