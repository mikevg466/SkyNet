import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from '../containers/Search';

export const UserHome = props => {
  const { email } = props;

  return (
    <div className="container-fluid">
      <h3>Welcome, { email }</h3>
      <Search />
    </div>
  );
};

const mapState = ({ user }) => ({
  email: user.email,
});

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string
};
