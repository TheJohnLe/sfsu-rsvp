import React, { Component } from "react";
import FacultyPortal from "./faculty/facultyPortal";
import StudentPortal from "./student/studentPortal";
import "./content.css";
import Axios from 'axios';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatus: null
    };
  }

  componentDidMount() {
    this.checkUserStatus();
  }

  async checkUserStatus() {
    let statusUrl = "http://localhost:5000/user/session/" + this.props.session_key;

    await Axios.get(statusUrl)
    .then(statusResponse => {
      this.setState({
        userStatus: statusResponse.data
      })
    })
    .catch((error) => console.log("Error: Cannot retrieve user's type"));
  }

  correctPortal() {
    if(this.state.userStatus === 'F')
      return <FacultyPortal session_key={this.props.session_key} />
    else if(this.state.userStatus === 'S')
      return <StudentPortal session_key={this.props.session_key} />
    else
      return <div>ERROR: Invalid User Type!</div>
  }

  render() {
    return (
      <div className="content">
        {this.correctPortal()}
      </div>
    );
  }
}

export default Content;
