import React from "react";

// import Combine from "./components/login/combine";
// import Home from "./components/homepage/home";

import Routes from "./routes";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authAction";

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
