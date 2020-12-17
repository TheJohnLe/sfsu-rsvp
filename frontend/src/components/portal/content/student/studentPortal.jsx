import React, { Component } from "react";
import CurrentAppointments from "./current-appointments/current-appointments";
import AppointmentFinder from "./appointment-finder/appointment-finder";

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findingAppointment: false,
    };
  }

  searchForApp = () => {
    this.setState({
      findingAppointment: true,
    });
  };

  cancelBrowsing = () => {
    this.setState({
      findingAppointment: false,
    });
  };

  render() {
    let { findingAppointment } = this.state;
    return (
      <div className="d-flex h-100 w-100">
        {findingAppointment ? (
          <AppointmentFinder
            session_key={this.props.session_key}
            cancelButtonPushed={this.cancelBrowsing.bind(this)}
          />
        ) : (
          <CurrentAppointments
            session_key={this.props.session_key}
            newAppButtonPressed={this.searchForApp.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default StudentView;
