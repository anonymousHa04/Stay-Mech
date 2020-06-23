import React from "react";
import Navbar from "../navigation/navigation";
import "./profile.scss";
import { Helmet } from "react-helmet";

import Edmodal from "../modal/education-modal";
import Workmodal from "../modal/work-modal";
import { loadEdDetails, educationDelete } from "../../redux/actions/edAction";
import { loadWorkDetails, workDelete } from "../../redux/actions/workAction";

import { connect } from "react-redux";

class Profile extends React.Component {
  //education detail delete
  onSuccessDelete = () => {
    this.props.loadEdDetails();
  };

  delete = (id) => {
    const newDelete = {
      id,
      callback: this.onSuccessDelete,
    };

    this.props.educationDelete(newDelete);
  };

  //work detail delete
  onSuccessWorkDelete = () => {
    this.props.loadWorkDetails();
  };
  Delete = (id) => {
    const newDelete = {
      id,
      callback: this.onSuccessWorkDelete,
    };
    this.props.workDelete(newDelete);
  };

  componentDidMount() {
    this.props.loadEdDetails();
    this.props.loadWorkDetails();
  }
  render() {
    const { education } = this.props.details;
    const { user } = this.props.auth;
    const { work } = this.props.work;

    return (
      <div>
        <Helmet>
          <title>Profile-staymech</title>
        </Helmet>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-5">
              {user ? (
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-8">
              <div className="shadow-sm p-3 mb-5 bg-white rounded mt-5">
                <h4 className="mb-4">Education</h4>
                {education &&
                  education.map((detail, idx) => (
                    <div key={idx}>
                      <div className="row">
                        <div className="col-md-9">
                          <h5>{detail.college}</h5>
                          <p>
                            {detail.program},{detail.degree}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p>
                            <span
                              className="mdi mdi-delete"
                              onClick={(e) => this.delete(detail.id)}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                <Edmodal />
              </div>
              <div className="shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="mb-4">Work Experience</h4>
                {work &&
                  work.map((detail, idx) => (
                    <div key={idx}>
                      <div className="row">
                        <div className="col-md-9">
                          <h5>{detail.company}</h5>
                          <p>{detail.role}</p>
                        </div>
                        <div className="col-md-3">
                          <p>
                            <span
                              className="mdi mdi-delete"
                              onClick={(e) => this.Delete(detail.id)}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                <Workmodal />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.edDetails.details,
  auth: state.auth,
  work: state.workDetails.work,
});

export default connect(mapStateToProps, {
  loadEdDetails,
  educationDelete,
  loadWorkDetails,
  workDelete,
})(Profile);
