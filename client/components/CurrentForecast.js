import React from 'react';
import PropTypes from 'prop-types';
import DayOfWeek from '../utils/DayOfWeek';

const CurrentForecast = props => {

  const { temperature, time, icon, summary } = props.forecast;
  const curDate = new Date(time * 1000);
  const image = `images/${ icon }.png`;
  return (
    <div>
      <div>
        <img className="img-responsive" src={image} />
      </div>
      <div>
        <h1>{ temperature }</h1>
        <h4>{ summary }</h4>
      </div>
    </div>
  )
}

export default CurrentForecast;
