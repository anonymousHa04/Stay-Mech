import React from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { connect } from "react-redux";
import { work, loadWorkDetails } from "../../redux/actions/workAction";
import PropTypes from "prop-types";

class Workmodal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      company: "",
      role: "",
    };
  }

  static propTypes = {
    work: PropTypes.func.isRequired,
    loadWorkDetails: PropTypes.func.isRequired,
  };

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  onchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSaveSuccess = () => {
    this.props.loadWorkDetails();
  };

  save = () => {
    const { company, role } = this.state;

    //create a new work object
    const newWork = {
      company,
      role,
      callback: this.onSaveSuccess,
    };

    this.props.work(newWork);

    this.setState({ show: !this.state.show });
  };

  render() {
    const data = this.props.data.work.work;
    return (
      <div>
        <Button
          variant="primary"
          onClick={() => {
            this.handleModal();
          }}
        >
          {data
            ? "Add New"
            : "Add work experience, including contracts and internships"}
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
              Add your employment or Internship Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicText">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Which company have you worked at ?"
                  name="company"
                  onChange={this.onchange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText2">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="ex:Design engineer"
                  name="role"
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
  data: state.workDetails,
});

export default connect(mapStateToProps, { work, loadWorkDetails })(Workmodal);
