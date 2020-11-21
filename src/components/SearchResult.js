import React from 'react';
import './SearchResult.css';

const SearchResult = (props) => {
  const options = props.campusData.map(building => (
    <li key = {building.id}>
      {building.building_name}
    </li>
  ))

  return <ul>{options}</ul>

}

export default SearchResult