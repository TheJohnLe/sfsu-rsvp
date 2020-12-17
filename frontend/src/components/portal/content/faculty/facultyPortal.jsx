import React, { Component } from "react";
import Appointments from "./appointments/appointments";
import Settings from "./settings/settings";

class FacultyPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
    };
  }

  toggleSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  };

  render() {
    return (
      <div className="h-100">
        {this.state.showSettings ? (
          <Settings
            session_key={this.props.session_key}
            homeButtonClicked={this.toggleSettings}
          />
        ) : (
          <Appointments
            session_key={this.props.session_key}
            settingsButtonClicked={this.toggleSettings}
          />
        )}
      </div>
    );
  }
}

export default FacultyPortal;
