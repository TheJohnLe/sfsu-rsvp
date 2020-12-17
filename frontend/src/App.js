import React, { Component } from "react";
import SingleSignOn from "./components/login/SingleSignOn";
import Portal from "./components/portal/portal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // DEBUG Purposes: set sess_key as => 1 = student; 2 = faculty
      sess_key: null
    };
  }

  navigateToPortal(sess_key) {
    this.setState({
      sess_key: sess_key,
    });
  }

  logoutAccount() {
    this.setState({
      sess_key: null,
    });
  }

  render() {
    let { sess_key } = this.state;

    return sess_key === null ? (
      <SingleSignOn
        handleLoginSuccess={(sess_key) => this.navigateToPortal(sess_key)}
      />
    ) : (
      <Portal
        session_key={this.state.sess_key}
        logoutButtonClicked={() => this.logoutAccount()}
      />
    );
  }
}

export default App;
