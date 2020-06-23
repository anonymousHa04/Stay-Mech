import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./history";
// import Navbar from "./components/navigation/navigation";
// import Combine from "./components/login/combine";
import Register from "./components/login/register";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Practice from "./components/practice/practice";
import Profile from "./components/profile/profile";
import PracticeContent from "./components/practice/practice-content";
import Play from "./components/quiz/play";
import QuizSummary from "./components/quiz/quizSummary";
import QuizInstructions from "./components/quiz/quizInstruction";
import ProtectRoute from "./protectedRoutes";

class Routes extends React.Component {
  // creating router for nav bar
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/practice" exact component={Practice} />
          <ProtectRoute path="/profile" exact component={Profile} />
          <Route path="/content/:topic" component={PracticeContent} />
          <ProtectRoute
            path="/instructions"
            exact
            component={QuizInstructions}
          />
          <ProtectRoute path="/quiz" exact component={Play} />
          <ProtectRoute path="/summary" exact component={QuizSummary} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
