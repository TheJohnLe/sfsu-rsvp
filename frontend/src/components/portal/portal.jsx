import React, { Component } from "react";
import Content from "./content/content";
import Footer from "./footer/footer";
import Header from "./header/header";

class Portal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="d-flex flex-column">
        <Header
          session_key={this.props.session_key}
          onLogoutButtonClicked={() => this.props.logoutButtonClicked()}
        />
        <Content session_key={this.props.session_key} />
        <Footer />
      </div>
    );
  }
}

export default Portal;
