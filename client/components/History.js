import React from 'react';
import { connect } from 'react-redux';
import Search from '../containers/Search';

export const History = props => {
  const { history } = props;

  return (
    <div className="container-fluid">
      <h2>Previous Searches:</h2>
      <ul className="list-unstyled">
        {
          history.map((address, idx) => (
            <li key={`${idx}_${address}`}>{address}</li>
          ))
        }
      </ul>
    </div>
  );
};

const mapState = ({ query }) => ({
  history: query.history,
});

export default connect(mapState)(History);
