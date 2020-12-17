import React, { Component } from "react";
import AppointmentTile from "../appointment-tile/appointment-tile";
import AppointmentDetails from "../appointment-details/appointment-details";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSlash,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      selectedAppointment: null,
      todaysDate: null
    };
  }

  componentDidMount() {
    this.getTodaysAppointments();
    this.todaysDate();
  }

  async getTodaysAppointments() {
    let url =
      "http://localhost:5000/faculty/" +
      this.props.session_key +
      "/appointments/today";
    await Axios.get(url)
      .then((appointmentsResponse) => {
        this.setState({
          appointments: appointmentsResponse.data,
          selectedAppointment: appointmentsResponse.data[0],
        });
      })
      .catch((error) =>
        console.log("Error: Cannot retrieve faculty's appointments today.")
      );
  }

  todaysDate = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    var day = date.getDate();
    var todaysDate = month + "/" + day + "/" + year;
    
    this.setState({
      todaysDate: todaysDate
    });
  };

  onSettingsClicked(e) {
    this.props.settingsButtonClicked();
  }

  swapSelection(appointment) {
    this.setState({
      selectedAppointment: appointment,
    });
  }

  displayAppointments() {
    return this.state.appointments.length == 0 ?
           this.noAppointmentsToday() 
           : this.showAppointmentsToday()
  }

  noAppointmentsToday() {
    return <div>
      No Appointments Today
    </div>
  }

  showAppointmentsToday() {
    return this.state.appointments.map((appointment) => (
      <AppointmentTile
        key={appointment.appointment_id}
        appointment={appointment}
        appointmentSelected={(appointment) =>
          this.swapSelection(appointment)
        }
      />
    ))
  }

  render() {
    return (
      <div className="w-100 h-100 d-flex">
        <div className="w-25 d-flex flex-column border scrollbar scrollbar-primary">
          <div className="d-flex justify-content-between border border-bottom">
            <b className="my-auto ml-3">{this.state.todaysDate}</b>
            <button
              className="m-1 btn btn-warning m-2"
              onClick={e => this.onSettingsClicked(e)}
            >
              Settings
            </button>
          </div>
          {/* List of appointments here */}
          {this.displayAppointments()}
        </div>
        <div className="w-100 px-4 py-2">
          {this.state.selectedAppointment != null ? (
            <AppointmentDetails appointment={this.state.selectedAppointment} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Appointments;
