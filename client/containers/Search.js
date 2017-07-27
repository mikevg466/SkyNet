import React from 'react';
import { connect } from 'react-redux';
import { getCurrentLocation, getCoordinates } from '../redux/location';
import { getForecast, getHistoricDay } from '../redux/weather';

export class Search extends React.Component{

  constructor(){
    super();
    this.state = {
      address: '',
      weatherData: []
    };
    this.searchChange = this.searchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.locationFinder = this.locationFinder.bind(this);
  }

  searchChange(e){
    this.setState({
      address: e.target.value
    });
  }

  locationFinder(e){
    e.preventDefault();
    this.props.handleGetLocation()
      .then(() => {
        const { latitude, longitude } = this.props.location;
        return this.props.handleGetForecast(latitude, longitude);
      })
      .catch(console.error.bind(console));
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleGetCoordinates(this.state.address)
      .then(() => {
        const { latitude, longitude } = this.props.location;
        return this.props.handleGetForecast(latitude, longitude);
      })
      .catch(console.error.bind(console));
    // TODO: then call darksky API's to pull weather info
      // forecast
      // historic

    // TODO: save query to database
  }

  render(){
    const user = this.props.user;
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
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
        <button
          type="button"
          className="btn btn-info"
          onClick={this.locationFinder}>
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

const mapState = ({ user, location }) => ({
  user,
  location,
});

const mapDispatch = dispatch => ({
  handleGetCoordinates: address => dispatch(getCoordinates(address)),
  handleGetLocation: () => dispatch(getCurrentLocation()),
  handleGetForecast: (lat, lng) => dispatch(getForecast(lat, lng)),
  handleGetHistoricDay: (lat, lng, time) => getHistoricDay(lat, lng, time),
});

export default connect(mapState, mapDispatch)(Search);
