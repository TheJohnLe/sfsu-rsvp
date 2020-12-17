import React, { Component } from "react";
import AppointmentTypeBrowser from "../appointment-type-browser/appointment-type-browser";
import TimeslotBrowser from "../timeslot-browser/timeslot-browser";

class AppointmentFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advising_type: null,
    };
  }

  /* Checks if appointment is available before trying to add */
  checkAppointmentPending(appointment) {}

  addAppointment(appointment) {
    /* Placeholder to POST appointment
    Axios.
    */
    let createAppointmentUrl = console.log("here");
    this.exitBrowsing();
  }

  handleChangeType = (type) => {
    this.setState({
      advising_type: type,
    });
  };

  exitBrowsing = () => {
    this.props.cancelButtonPushed();
  };

  render() {
    let { advising_type } = this.state;
    return (
      <div className="w-100 h-100">
        <button
          className="btn btn-danger m-4 px-4 position-absolute"
          onClick={this.exitBrowsing.bind(this)}
        >
          Cancel
        </button>
        {advising_type === null ? (
          <AppointmentTypeBrowser
            typeSelected={this.handleChangeType.bind(this)}
          />
        ) : (
          <TimeslotBrowser
            advising={advising_type}
            appointmentPicked={(appointment) =>
              this.addAppointment(appointment)
            }
          />
        )}
      </div>
    );
  }
}

export default AppointmentFinder;
