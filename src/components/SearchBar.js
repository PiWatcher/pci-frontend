import React, { useContext } from 'react';
import './SearchBar.css';
import { Dropdown } from 'semantic-ui-react';
import { BuildingContext } from '../contexts/BuildingContext';


const SearchBar = () => {

  // consumes context of BuildingContext
  const { buildingList, setBuilding } = useContext( BuildingContext );


  // BUG: pull building from dropdown selection and pass back to context

  // returns searchbar component
  return (
    <div className="search-bar">
        <Dropdown
          onChange={() => setBuilding('SICCS')}
          placeholder='Select a building'
          fluid
          search
          selection
          options={ buildingList }
        />
    </div>
  );  
}
 
export default SearchBar;





// class SearchBar extends Component {
//   constructor(props) {

//     super(props);
//     this.state = {
//       query: '',
//       campus_data: [],
//       roomData: false,
//       room_list: [],
//       avail_options: null,
//       current_room: '',
//       room_counts: [],
//       times: []
//   }

//   // binding functions to current state
//   this.findRoom = this.findRoom.bind(this)
//   this.SearchResult = this.SearchResult.bind(this)
//   this.SelectRoom = this.SelectRoom.bind(this)
//  }

//   // 
//   findRoom = () => {
//     if (this.state.query.toString().toUpperCase() === this.state.campus_data[0]['building'].toString()) {
//       console.log('success');
//       this.setState({roomData: true});

//       this.SearchResult()
//     }
//     return null  
//     //console.log("sad")
//   }


//   // checks form input for matching building
//   handleInputChange = () => {
//     this.setState({
//       query: this.search.value
//       }, () => {
//       if (this.state.query && this.state.query.length > 1) {

//           return this.findRoom()
        
//       } 
//     })
//   }

//   // parses through rooms
//   SearchResult = () => {

  
//     console.log("Campus data: " + this.state.campus_data)

//     for (var i = 0; i < this.state.campus_data.length; i++) {
//       var room_name = this.state.campus_data[i]['endpoint']
//       // var name1 = room_name.split('-')[0]
//       // var name2 = room_name.split('-')[1]
//       // name1 = name1.charAt(0).toUpperCase() + name1.slice(1)
//       // room_name = name1 + " " + name2
//       console.log(room_name)
//       if (!this.state.room_list.includes(room_name)) {
//         this.state.room_list.push(room_name)
//         console.log("Room name: " + this.state.room_list)
//       }
//     }

//     // buttons
//     this.setState({
//       avail_options: this.state.room_list.map(room => (
//         <li key={room}>
//           <button type="button" onClick={() => this.SelectRoom(room)}>{room}</button>
//         </li>
//          ))
//     });
//   }

//   //
  
    

//   render() {

//     return (
//       this.state.roomData === false ?
//       <div>
//         <form>
//           <input className="SearchBar"
//             placeholder="Search for..."
//             ref={input => this.search = input}
//             onChange={this.handleInputChange}
//           />
//           {/*<SearchResult campusData = {this.state.campus_data}
//           roomData = {this.state.roomData} />*/}
//           <br></br>
//         </form>
//       </div>
      
//       :

//       <div>
//         <form>
//           <input className="SearchBar"
//             placeholder="Search for..."
//             ref={input => this.search = input}
//             onChange={this.handleInputChange}
//           />
//           <ul>{this.state.avail_options}</ul>
//           <button type="button" onClick={() => this.getData()}>Update</button>


//           {/* <SearchResult campusData = {this.state.campus_data} /> */}
//           <br></br>
//         </form>
        
//         <div className="count-row">
//         <LineGraph building = {this.state.query} room = {this.state.current_room} 
//           counts = {this.state.room_counts} times = {this.state.times}/>

//         <CountCard counts = {this.state.room_counts[this.state.room_counts.length - 1]}/>
//         </div>

        
//       </div>
     

//     )
//   }
// }

// export default SearchBar