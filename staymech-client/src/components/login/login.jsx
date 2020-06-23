import React from "react";
import loginImg from "../../login.svg";
import "./style.scss";
import Navbar from "../navigation/navigation";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/authAction";
import { clearErrors } from "../../redux/actions/errorAction";
import history from "../../history";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for login user
      if (error.id === "LOGIN_FAIL") {
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

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    //Attempt to login
    this.props.login(user);
  };

  onClick = () => {
    //clear errors
    this.props.clearErrors();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Login-staymech</title>
        </Helmet>
        <Navbar />
        <div className="container">
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
          <div className="base-container shadow p-3 mb-5 bg-white rounded mt-4 mx-auto">
            <div className="header">Login</div>
            <div className="content">
              <div className="image">
                <img src={loginImg} alt="img" />
              </div>
              <div className="form">
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
            <div className="footer">
              <button type="submit" className="btn" onClick={this.onSubmit}>
                Login
              </button>
            </div>
            <p>
              Don't have account click <a href="/register">Here</a> To Register
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

export default connect(mapStateToProps, { login, clearErrors })(Login);
