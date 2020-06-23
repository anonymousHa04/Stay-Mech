import React, { Component, Fragment } from "react";
import logo from "../../cogs-solid.svg";

import "./navigation.scss";
import history from "../../history";

import { connect } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class Navbar extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLink = (
      <Fragment>
        <nav>
          <span className="navbar-text mr-3">
            <strong>{user ? `welcome ${user.name}` : ""}</strong>
          </span>
        </nav>
        <nav
          className="logout"
          onClick={() => {
            if (window.confirm("Are you sure to logout ?")) this.props.logout();
            history.push("/");
          }}
        >
          <span className="navbar-text">
            <strong> Logout</strong>
          </span>
        </nav>
      </Fragment>
    );

    const guestLink = (
      <Fragment>
        <Link to="/register" className="nav-link">
          Register
        </Link>

        <Link to="/login" className="nav-link">
          Login
        </Link>
      </Fragment>
    );
    const contestUser = (
      <Link to="/instructions" className="nav-link">
        Contests
      </Link>
    );

    const contestGuest = (
      <Link to="/login" className="nav-link">
        Contests
      </Link>
    );

    const Profile = (
      <Link to="/profile" className="nav-link">
        Profile
      </Link>
    );

    return (
      <div className="Container ">
        <nav className="navbar navbar-expand-lg  navigation">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="logo" className="logo-img" />
            StayMech
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item mr-4">
                <Link to="/practice" className="nav-link">
                  Practice
                </Link>
              </li>
              <li className="nav-item mr-4">
                {isAuthenticated ? contestUser : contestGuest}
              </li>
              <li className="nav-item">{isAuthenticated ? Profile : ""}</li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              {isAuthenticated ? authLink : guestLink}
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
