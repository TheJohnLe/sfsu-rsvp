import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer text-light d-flex flex-column align-items-center">
        <p className="text-center my-auto">
          App Issue? Contact csgrad@sfsu.edu
        </p>
      </div>
    );
  }
}

export default Footer;
