import React, {Component} from 'react';
import './SearchBar.css';
import axios from 'axios';
import LineGraph from '../components/LineGraph';
import CountCard from '../components/CountCard';

class SearchBar extends Component {
  constructor(props) {

    super(props);
    this.state = {
      query: '',
      campus_data: [],
      roomData: false,
      room_list: [],
      avail_options: null,
      current_room: '',
      room_counts: [],
      times: []
  }

  // binding functions to current state
  this.getData = this.getData.bind(this)
  this.findRoom = this.findRoom.bind(this)
  this.SearchResult = this.SearchResult.bind(this)
  this.SelectRoom = this.SelectRoom.bind(this)
 }

 // gets data only after the component is mounted
 componentDidMount() {
  this.getData();
 }

 componentDidUpdate(prevProps) {

  if (prevProps !== this.props){
     this.setState({
       campus_data: this.props.campus_data
     })
  }
}
  
 // axios gets data fro backend
  getData = () => axios.get('http://127.0.0.1:5000/api/SICCS')
  .then( (response) => {
    console.log(response.data.data);
    this.setState({campus_data: response.data.data})
  })
  .catch(function (error) {
    console.log(error);
  });


  // 
  findRoom = () => {
    //let building_and_room = this.state.query.split(" ");
    // console.log("Data: " + this.state.campus_data)
    // console.log("[" +this.state.query.toString().toUpperCase() + "]")
    // console.log("[" +this.state.campus_data[0]['building'].toString() + "]")
    if (this.state.query.toString().toUpperCase() === this.state.campus_data[0]['building'].toString()) {
      console.log('success');
      this.setState({roomData: true});

      this.SearchResult()
    }
    return null  
    //console.log("sad")
  }


  // checks form input for matching building
  handleInputChange = () => {
    this.setState({
      query: this.search.value
      }, () => {
      if (this.state.query && this.state.query.length > 1) {

          return this.findRoom()
        
      } 
    })
  }

  // parses through rooms
  SearchResult = () => {

  
    console.log("Campus data: " + this.state.campus_data)

    for (var i = 0; i < this.state.campus_data.length; i++) {
      var room_name = this.state.campus_data[i]['endpoint']
      // var name1 = room_name.split('-')[0]
      // var name2 = room_name.split('-')[1]
      // name1 = name1.charAt(0).toUpperCase() + name1.slice(1)
      // room_name = name1 + " " + name2
      console.log(room_name)
      if (!this.state.room_list.includes(room_name)) {
        this.state.room_list.push(room_name)
        console.log("Room name: " + this.state.room_list)
      }
    }

    // buttons
    this.setState({
      avail_options: this.state.room_list.map(room => (
        <li key={room}>
          <button type="button" onClick={() => this.SelectRoom(room)}>{room}</button>
        </li>
         ))
    });
  }

  //
  SelectRoom = (room) => {

    var len = this.state.times.length

    for (var k = 0; k < len; k++){
      this.state.times.pop();
    }

    for (var j = 0; j < len; j++){
      this.state.room_counts.pop();
    }

    for (var i = 0; i < this.state.campus_data.length; i++) {

      console.log("times:" + this.state.times)

      var room_name = this.state.campus_data[i]['endpoint']
      console.log(room_name)
      if (room === room_name) {

        // pushes the count to a list
        this.state.room_counts.push(this.state.campus_data[i]['count'])

        // formats the date before pushing to the list
        var date = this.state.campus_data[i]['timestamp']['$date']
        var parsedDate = new Date(date)
        var dateString = `${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${parsedDate.getHours()}:${parsedDate.getMinutes()}:${parsedDate.getSeconds()}`
        this.state.times.push(dateString)
      }
    }

    console.log("Room counts: " + this.state.room_counts)
    console.log("Times: " + this.state.times)
    
    this.setState({
      current_room : room,
    });

    console.log("Current room: " + this.state.current_room)
  }
    

  render() {

    return (
      this.state.roomData === false ?
      <div>
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
      </div>
      
      :

      <div>
        <form>
          <input className="SearchBar"
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          <ul>{this.state.avail_options}</ul>
          {/* <SearchResult campusData = {this.state.campus_data} /> */}
          <br></br>
        </form>
        
        <div className="count-row">
        <LineGraph building = {this.state.query} room = {this.state.current_room} 
          counts = {this.state.room_counts} times = {this.state.times}/>

        <CountCard counts = {this.state.room_counts[this.state.room_counts.length - 1]}/>
        </div>

        
      </div>
     

    )
  }
}

export default SearchBar