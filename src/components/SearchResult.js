import React, {Component} from 'react';
import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
  }
 }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
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
        <p>{this.state.query}</p>
        <br></br>
      </form>
    )
  }
}

export default SearchResult