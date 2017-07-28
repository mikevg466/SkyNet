import React from 'react';
import { connect } from 'react-redux';
import { getCurrentLocation, getCoordinates } from '../redux/location';
import { getForecast, getHistoricDay } from '../redux/weather';
import { saveQuery } from '../redux/query';
import CurrentForecast from '../components/CurrentForecast';
import DayForecast from '../components/DayForecast';
import BarChart from '../components/BarChart.js';
import Promise from 'bluebird';
import Month from '../utils/Month';

export class Search extends React.Component{

  constructor(){
    super();
    this.state = {
      address: ''
    };
    this.searchChange = this.searchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.locationFinder = this.locationFinder.bind(this);
    this.mapData = this.mapData.bind(this);
  }

  searchChange(e){
    this.setState({
      address: e.target.value
    });
  }

  getHistoricDates(){
    const historicDates = [];
    for(let i = 1; i <= 5; i++){
      const curDate = new Date();
      curDate.setDate(curDate.getDate() - i);
      historicDates.push(Math.round(curDate.getTime() / 1000));
    }
    return historicDates;
  }

  getHistoricLabels(){
    const historicDates = this.getHistoricDates();
    return historicDates
      .map(utc => new Date(utc * 1000))
      .map(date => `${ Month[date.getMonth()] } ${ date.getDate() }`);
  }

  mapData(){
    const labels = this.getHistoricLabels();
    const data = this.props.weather.historic
      .map(forecast => forecast.temperatureMax);
    return labels.map((label, idx) => ({
      label,
      data: data[idx]
    }));
  }

  locationFinder(e){
    e.preventDefault();
    const historicDates = this.getHistoricDates();
    this.props.handleGetLocation()
      .then(() => {
        const { latitude, longitude } = this.props.location;
        return this.props.handleGetForecast(latitude, longitude);
      })
      .then(() => {
        const { latitude, longitude } = this.props.location;
        return Promise.each(
          historicDates,
          (time) => this.props.handleGetHistoricDay(latitude, longitude, time)
        )
      })
      .then(() => this.props.handleSaveQuery())
      .catch(console.error.bind(console));
  }

  handleSubmit(e){
    e.preventDefault();
    const historicDates = this.getHistoricDates();
    this.props.handleGetCoordinates(this.state.address)
      .then(() => {
        const { latitude, longitude } = this.props.location;
        return this.props.handleGetForecast(latitude, longitude);
      })
      .then(() => {
        const { latitude, longitude } = this.props.location;
        return Promise.each(
          historicDates,
          (time) => this.props.handleGetHistoricDay(latitude, longitude, time)
        )
      })
      .then(() => this.props.handleSaveQuery())
      .catch(console.error.bind(console));
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
              !this.props.weather.historic.length ?
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
                      <BarChart data={this.mapData()} size={[500,500]} />
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
