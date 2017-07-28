import React from 'react';
import { connect } from 'react-redux';
import { getCurrentLocation, getCoordinates } from '../redux/location';
import { getForecast, getHistoricDay } from '../redux/weather';
import { saveQuery } from '../redux/query';
import CurrentForecast from '../components/CurrentForecast';
import DayForecast from '../components/DayForecast';
import BarChart from '../components/BarChart.js';

export class Search extends React.Component{

  constructor(){
    super();
    this.state = {
      address: ''
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
      .then(() => this.props.handleSaveQuery())
      .catch(console.error.bind(console));
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleGetCoordinates(this.state.address)
      .then(() => {
        const { latitude, longitude } = this.props.location;
        return this.props.handleGetForecast(latitude, longitude);
      })
      .then(() => this.props.handleSaveQuery())
      .catch(console.error.bind(console));
    // TODO: then call darksky API's to pull weather info
      // forecast
      // historic
  }

  render(){
    const user = this.props.user;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row ">
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
            </div>
            {
              !this.props.weather.forecast.length ?
                <pre>{'Search above!'}</pre> :
                <div>
                  <div className="row">
                    <h2>Weather for {this.props.location.address}</h2>
                  </div>
                  <div className="row ">
                    <CurrentForecast
                      forecast={this.props.weather.current}
                    />
                  </div>
                  <div className="row ">
                    {
                      this.props.weather.forecast
                        .slice(0,5)
                        .map(forecast => (
                          <div key={forecast.time} className="col-md-2">
                            <DayForecast
                              forecast={forecast}
                            />
                          </div>
                        ))
                    }
                  </div>
                  <div className="row">
                    <h2>Max Temperature/Day for past 5 days</h2>
                    {
                      <BarChart data={this.props.weather.forecast
                        .map(forecast => forecast.temperatureMax)} size={[500,500]} />
                    }
                  </div>
                </div>
            }
            <div className="row ">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.locationFinder}>
                  Find Me
              </button>
              <button type="submit" className="btn btn-success">
                Search!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

const mapState = ({ user, location, weather }) => ({
  user,
  location,
  weather,
});

const mapDispatch = dispatch => ({
  handleGetCoordinates: address => dispatch(getCoordinates(address)),
  handleGetLocation: () => dispatch(getCurrentLocation()),
  handleGetForecast: (lat, lng) => dispatch(getForecast(lat, lng)),
  handleGetHistoricDay: (lat, lng, time) => dispatch(getHistoricDay(lat, lng, time)),
  handleSaveQuery: () => dispatch(saveQuery()),
});

export default connect(mapState, mapDispatch)(Search);
