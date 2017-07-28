import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Component //

const Main = (props) => {

  const { children, handleClick, loggedIn, isGamePlaying } = props;

  return (
      <div>
      {isGamePlaying ?
        null :
        <div>
          <nav className="navbar navbar-inverse" role="navigation">
            <div className="container">
              <div className="navbar-header">
                <Link className="navbar-brand" to="home">
                    SkyNet
                </Link>
                <Link className="navbar-brand" to="loginHome">
                  Signup/Login
                </Link>
                <Link className="navbar-brand" to="history">
                  Past Searches
                </Link>
                <ul className="nav navbar-nav" />
              </div>
            </div>
          </nav>
        </div>
      }
        <div>
          {props.children}
        </div>
      </div>
  )
}

const mapState = ({ user }) => ({
  loggedIn: !!user.id
});
const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});
export default connect(mapState, mapDispatch)(Main);
