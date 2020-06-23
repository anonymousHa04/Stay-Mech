import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./quizSummary.scss";

class QuizSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberofQuestions: 0,
      numberofAnsweredQuestion: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintUsed: 0,
      fiftyFiftyUsed: 0,
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    this.setState({
      score: (state.score / state.numberofQuestions) * 100,
      numberofQuestions: state.numberofQuestions,
      numberofAnsweredQuestion: state.numberofAnsweredQuestion,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      hintUsed: state.hintUsed,
      fiftyFiftyUsed: state.fiftyFiftyUsed,
    });
  }
  render() {
    const { state } = this.props.location;
    let stats, remark;
    let userScore = this.state.score;

    if (userScore <= 30) {
      remark = "You need more practice!";
    } else if (userScore > 30 && userScore <= 50) {
      remark = "Better luck next time!";
    } else if (userScore <= 70 && userScore > 50) {
      remark = "You can do better!";
    } else if (userScore >= 71 && userScore <= 84) {
      remark = "You did great!";
    } else {
      remark = "You're an absolute genius!";
    }

    if (state !== undefined) {
      stats = (
        <Fragment>
          <div style={{ textAlign: "center" }}>
            <span className="mdi mdi-check-circle-outline success-icon"></span>
          </div>
          <h1>Quiz has ended</h1>
          <div className="container stats">
            <h4>{remark}</h4>
            <h2>Your score: {this.state.score.toFixed(0)}&#37;</h2>
            <span className="stat left">Total number of questions:</span>
            <span className="right">{this.state.numberofQuestions}</span>
            <br />

            <span className="stat left">Number of attempted questions:</span>
            <span className="right">{this.state.numberofAnsweredQuestion}</span>
            <br />

            <span className="stat left">Number of Correct Answers:</span>
            <span className="right">{this.state.correctAnswers}</span>
            <br />

            <span className="stat left">Number of Wrong Answers:</span>
            <span className="right">{this.state.wrongAnswers}</span>
            <br />

            <span className="stat left">Hints Used:</span>
            <span className="right">{this.state.hintUsed}</span>
            <br />

            <span className="stat left">50-50 Used:</span>
            <span className="right">{this.state.fiftyFiftyUsed}</span>
          </div>
          <section>
            <ul>
              <li>
                <Link to="/">Back to Home</Link>
              </li>
              <li>
                <Link to="/quiz">Try Again</Link>
              </li>
            </ul>
          </section>
        </Fragment>
      );
    } else {
      stats = (
        <section>
          <h1 className="no-stats">No stats available please take a quiz</h1>
          <ul>
            <li>
              <Link to="/">Back to Home</Link>
            </li>
            <li>
              <Link to="/quiz">Try Again</Link>
            </li>
          </ul>
        </section>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>Quiz App - summary</title>
        </Helmet>
        <div className="quiz-summary">{stats}</div>
      </Fragment>
    );
  }
}

export default QuizSummary;
