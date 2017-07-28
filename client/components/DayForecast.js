import React from 'react';
import PropTypes from 'prop-types';
import DayOfWeek from '../utils/DayOfWeek';

const DayForecast = props => {

  const { temperatureMax, temperatureMin, time, icon } = props.forecast;
  const curDate = new Date(time * 1000);
  const image = `images/${ icon }.png`;
  return (
    <div className="thumbnail text-center">
      <div>
        <h3>{ DayOfWeek[curDate.getDay()] }</h3>
      </div>
      <div>
        <img className="img-responsive" src={image} />
      </div>
      <div>
        <h2>High { temperatureMax }</h2>
        <h3>Low { temperatureMin }</h3>
        <h4>{ icon }</h4>
      </div>
    </div>
  )
}

export default DayForecast;
