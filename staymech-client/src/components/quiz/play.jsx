import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import "./play.scss";
// import "../../../node_modules/materialize-css/dist/css/materialize.min.css";
// import "../../../node_modules/materialize-css/dist/js/materialize.min.js";
import questions from "./questions.json";
import isEmpty from "../../utils/is-empty";
import M from "materialize-css";
import classnames from "classnames";

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberofQuestions: 0,
      numberofAnsweredQuestion: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      time: {},
      previousRandomNumbers: [],
      nextButtonDisabled: false,
      previousButtonDisabled: true,
    };
    this.interval = null;
  }

  componentDidMount() {
    const {
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion,
    } = this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;

      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberofQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.WrongAnswer();
    }
  };

  correctAnswer = () => {
    M.toast({
      html: "correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberofAnsweredQuestion: prevState.numberofAnsweredQuestion + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  WrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberofAnsweredQuestion: prevState.numberofAnsweredQuestion + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  handleNextButtonClick = () => {
    if ((this.state.nextQuestion = !undefined)) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    if ((this.state.nextQuestion = !undefined)) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = (e) => {
    if (window.confirm("Are you sure you want to quit?")) {
      this.props.history.push("/");
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;

      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  showOptions = () => {
    const option = Array.from(document.querySelectorAll(".option"));

    option.forEach((option) => {
      option.style.visibility = "visible";
    });
    this.setState({
      usedFiftyFifty: false,
    });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(
                  randomNumber
                ),
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = Array.from(document.querySelectorAll(".option"));
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLocaleLowerCase() ===
          this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });
      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                randomNumbers.includes(newRandomNumber) &&
                !randomNumbers.includes(indexOfAnswer)
              ) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
      }));
    }
  };

  startTimer = () => {
    const countDownTime = Date.now() + 240000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberofQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  endGame = () => {
    alert("Quiz has ended!");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberofQuestions: state.numberofQuestions,
      numberofAnsweredQuestion: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintUsed: 5 - state.hints,
    };
    // console.log(playerStats);
    setTimeout(() => {
      this.props.history.push("/summary", playerStats);
    }, 1000);
  };

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      numberofQuestions,
      hints,
      fiftyFifty,
      time,
    } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Quiz Page</title>
        </Helmet>
        <div className="questions">
          <h2>Quiz Mode</h2>
          <div className="lifeline-container">
            <p>
              <span
                onClick={this.handleFiftyFifty}
                className="mdi mdi-set-center mdi-24px lifeline-icon"
              >
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span
                onClick={this.handleHints}
                className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
              >
                <span className="lifeline">{hints}</span>
              </span>
            </p>
          </div>
          <div>
            <p className="timer">
              <span className="life">
                {currentQuestionIndex + 1} of {numberofQuestions}
              </span>
              <span className="life">
                {time.minutes} : {time.seconds}
                <span className="mdi mdi-clock-outline mdi-24px"></span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>

          <div className="option-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="option-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <button
              id="previous-button"
              className={classnames("", {
                disable: this.state.previousButtonDisabled,
              })}
              onClick={this.handleButtonClick}
            >
              Previous
            </button>
            <button
              id="next-button"
              className={classnames("", {
                disable: this.state.nextButtonDisabled,
              })}
              onClick={this.handleButtonClick}
            >
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Play;
