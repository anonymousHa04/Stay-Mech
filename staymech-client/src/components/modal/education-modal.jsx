import React from "react";
import { connect } from "react-redux";
import { education, loadEdDetails } from "../../redux/actions/edAction";
import PropTypes from "prop-types";

import { Modal, Button, Form } from "react-bootstrap";

class Edmodal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      college: "",
      program: "",
      degree: "",
    };
  }

  static propTypes = {
    education: PropTypes.func.isRequired,
  };

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  onchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSaveSuccess = () => {
    this.props.loadEdDetails();
  };

  save = () => {
    const { college, program, degree } = this.state;

    //create new education object
    const newEducation = {
      college,
      program,
      degree,
      callback: this.onSaveSuccess,
    };
    this.props.education(newEducation);
    this.setState({ show: !this.state.show });
  };

  render() {
    const { education } = this.props.data.details;

    return (
      <div>
        <Button
          variant="primary"
          onClick={() => {
            this.handleModal();
          }}
        >
          {education ? "Add New" : "Add your Education history"}
        </Button>
        <Modal
          show={this.state.show}
          onHide={() => this.handleModal()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Enter Your Education Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicText">
                <Form.Label>College</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Which college have you studied at ?"
                  name="college"
                  onChange={this.onchange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText2">
                <Form.Label>Program</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="ex:Mechanical engineering"
                  name="program"
                  onChange={this.onchange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText2">
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="ex:B.E"
                  name="degree"
                  onChange={this.onchange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleModal()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.save()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.edDetails,
});

export default connect(mapStateToProps, { education, loadEdDetails })(Edmodal);
