import React from "react";
import loginImg from "../../login.svg";
import "./style.scss";
import Navbar from "../navigation/navigation";
import history from "../../history";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../redux/actions/authAction";
import { clearErrors } from "../../redux/actions/errorAction";
class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for register user
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //if authenticated redirect to home
    if (isAuthenticated) {
      history.push("/");
    }
  }

  onchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    //Create user Object
    const newUser = {
      name,
      email,
      password,
    };

    //Attempt to register
    this.props.register(newUser);
  };

  onClick = () => {
    //clear errors
    this.props.clearErrors();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Register-staymech</title>
        </Helmet>
        <Navbar />
        <div className="container mt-4">
          {this.state.msg ? (
            <div className="alert alert-danger mx-auto" role="alert">
              {this.state.msg}
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={this.onClick}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : null}
          <div className="base-container shadow p-3 mb-5 bg-white rounded mt-1 mx-auto ">
            <div className="header">Register</div>
            <div className="content">
              <div className="image1">
                <img src={loginImg} alt="img" />
              </div>
              <div className="form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="username"
                    onChange={this.onchange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={this.onchange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.onchange}
                  />
                </div>
              </div>
            </div>
            <div className="footer1">
              <button type="submit" className="btn" onClick={this.onSubmit}>
                Register
              </button>
            </div>
            <p>
              Already have Account Click <a href="/login">Here</a>To Login
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
