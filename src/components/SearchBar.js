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
      roomData: false,
      room_names: []
  }
  this.getData = this.getData.bind(this)
  this.findRoom = this.findRoom.bind(this)
  this.getData()
 }

  
  getData = () => axios.get('http://127.0.0.1:5000/api/SICCS')
  .then( (response) => {
    console.log(response.data.data);
    this.setState({campus_data: response.data.data})
  })
  .catch(function (error) {
    console.log(error);
  });

  findRoom = () => {
    //let building_and_room = this.state.query.split(" ");
    console.log(this.state.campus_data)
    console.log("[" +this.state.query.toString().toUpperCase() + "]")
    console.log("[" +this.state.campus_data[0]['building'].toString() + "]")
    if (this.state.query.toString().toUpperCase() === this.state.campus_data[0]['building'].toString()) {
      console.log('success');
      this.setState({roomData: true})
      return <SearchResult campusData = {this.state.campus_data} />;
    
    }
      
    return null  
    //console.log("sad")
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
      }, () => {
      if (this.state.query && this.state.query.length > 1) {
       
          return this.findRoom()
        
      } 
    })
  }

  render() {
    return (
      this.state.roomData === false ?
      <form>
        <input className="SearchBar"
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        {/*<SearchResult campusData = {this.state.campus_data}
         roomData = {this.state.roomData} />*/}
        <br></br>
      </form>
      :
      <form>
        <input className="SearchBar"
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <SearchResult campusData = {this.state.campus_data}
         roomData = {this.state.roomData} />
        <br></br>
      </form>
    )
  }
}

export default SearchBar