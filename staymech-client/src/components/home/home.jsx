import React from "react";

import "./home.scss";
import Navbar from "../navigation/navigation";
import Image from "./home-page.png";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import history from "../../history";
class Home extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row margin">
            <div className="col-md-7">
              <div>
                <h1 className="display-4">
                  Enhance your Knowledge <br />
                  with Right Content
                </h1>
                <div className="row">
                  <div className="col">
                    <h1 className="mt-3">For Learning</h1>
                    <p>
                      we are the leading platform to provide a such learning
                      experience especially for mechanical engineering students
                    </p>
                    <input
                      type="button"
                      value="Start Learning"
                      className="btn btn-primary btn-lg"
                      onClick={() => history.push("/practice")}
                    />
                  </div>
                  <div className="col">
                    <h1 className="mt-3">For Contest</h1>
                    <p>
                      Join our platform to participate in a <br />
                      real-time quiz and test your knowledge <br />
                      and work towards to improve.
                    </p>
                    {isAuthenticated ? (
                      <input
                        type="button"
                        value="Go To Contest"
                        className="btn btn-primary btn-lg homebtn"
                        onClick={() => history.push("/instructions")}
                      />
                    ) : (
                      <input
                        type="button"
                        value="Login"
                        className="btn btn-primary btn-lg homebtn"
                        onClick={() => history.push("/login")}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <img src={Image} alt="Home" className="home-img " />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
