import React, { Component } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
    };
  }

  componentDidMount() {
    this.retrieveUser();
  }

  async retrieveUser() {
    let url = "http://localhost:5000/faculty/" + this.props.session_key;
    await Axios.get(url)
      .then((facultyInfoResponse) => {
        this.setState({
          name:
            facultyInfoResponse.data[0].first_name +
            " " +
            facultyInfoResponse.data[0].last_name,
        });
      })
      .catch((error) => console.log("Error Retrieving User's name for Header"));
  }

  render() {
    return (
      <div className="header text-light d-flex justify-content-between align-items-center">
        <h1 className="m-4" style={{ color: "#C99700" }}>
          iAssist
        </h1>
        <div className="m-4 d-flex flex-column align-items-center">
          <h5>{this.state.name}</h5>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="2x"
            onClick={() => this.props.onLogoutButtonClicked()}
          />
        </div>
      </div>
    );
  }
}

export default Header;
