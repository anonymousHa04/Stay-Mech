import React from "react";
import ReactHtmlParser from "react-html-parser";
import Navbar from "../navigation/navigation";

import { connect } from "react-redux";
import { loadPractice } from "../../redux/actions/practiceAction";
import PropTypes from "prop-types";

class PracticeContent extends React.Component {
  static propTypes = {
    loadPractice: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadPractice();
  }
  render() {
    const { practice } = this.props.practice;
    const { topic } = this.props.match.params;
    console.log(practice);
    return (
      <div>
        <Navbar />
        {practice
          .filter((f) => f.topic === topic)
          .map((p, idx) => (
            <div className="container mt-5" key={idx}>
              {ReactHtmlParser(p.content)}
              <h4>Example:</h4>
              <p>{p.example}</p>
              <img src={p.url} alt="example" className="mb-3" />
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  practice: state.practice,
});

export default connect(mapStateToProps, { loadPractice })(PracticeContent);
