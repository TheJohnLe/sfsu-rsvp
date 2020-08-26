import React, { Component } from "react";
import SingleSignOn from "./components/login/SingleSignOn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  render() {
    let { isLoggedIn } = this.state;

    return isLoggedIn ? <SingleSignOn /> : null;
  }
}

export default App;
