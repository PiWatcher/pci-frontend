import React, {Component} from 'react';
import './SearchBar.css';
import axios from 'axios';
import SearchResult from './SearchResult';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      campus_data: [],
      buildingName: '',
      roomData: null
  }
  this.getData = this.getData.bind(this)
  this.findRoom = this.findRoom.bind(this)
  this.getData()
 }

  getData = () => axios.get('http://localhost:4000/SICCS/')
  .then( function (response) {
    console.log(response.data.data);
    console.log(Object.values(response.data.data[0])[5]);
    this.setState({campus_data: response.data.data})
  })
  .catch(function (error) {
    console.log(error);
  });

  findRoom = () => {
    let building_and_room = this.state.query.split(" ");
    for (var i = 0; i < this.state.campus_data.length; i++)
      console.log(this.state.campus_data)
      console.log(Object.values(this.state.campus_data))
      /*if (Object.values(this.state.campus_data[i])[2].toUpperCase() === building_and_room[0])
        console.log("bldg found")
        this.setState({
          buildingName: building_and_room[0]
          
        })*/
      
    console.log("sad")
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
      }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.findRoom()
        }
      } 
    })
  }

  render() {
    return (
      <form>
        <input className="SearchBar"
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <SearchResult buildingName = {this.state.buildingName}
         roomData = {this.state.roomData} />
        <br></br>
      </form>
    )
  }
}

export default SearchBar