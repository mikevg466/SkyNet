import React from 'react';
import { connect } from 'react-redux';

export class Search extends React.Component{

  constructor(){
    super();
    this.state = {
      address: '',
      weatherData: []
    };
    this.searchChange = this.searchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchChange(e){
    this.setState({
      address: e.target.value
    });
  }

  handleSubmit(e, address){
    // TODO: call google API's using address to pull location data
    // TODO: then call darksky API's to pull weather info
    console.log('address submitted', address);
  }

  render(){
    const user = this.props.user;
    return (
      <div>
      <form onSubmit={(e) => { this.handleSubmit(e, this.state.address) }}>
        <div className="form-group row">
          <div className="col-md-12 col-xs-12">
            <label className="col-xs-2 control-label">Search</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              placeholder="Enter search query"
              onChange={this.searchChange}
            />
          </div>
        </div>
        {
          !this.state.weatherData.length ?
            <pre>{'Search above!'}</pre> :
            null // TODO: Add D3 tables here once weather information is being retrieved. Make separate component for this
        }
        <button type="button" className="btn btn-info">
          Find Me
        </button>
        <button type="submit" className="btn btn-success">
          Search!
        </button>
      </form>
      </div>
    );
  }
};

const mapState = ({ user }) => ({
  user,
});

export default connect(mapState)(Search);
