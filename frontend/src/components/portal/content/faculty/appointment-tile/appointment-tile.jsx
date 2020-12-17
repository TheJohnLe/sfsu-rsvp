import React, { Component } from "react";
import Axios from "axios";

class AppointmentTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null,
    };
  }

  componentDidMount() {
    this.fetchStudentName();
  }

  // Retrieves the student's name from the appointment-tile's s_id
  async fetchStudentName() {
    let student_id = this.props.appointment.student_id;
    let studentUrl = "http://localhost:5000/students/" + student_id;

    await Axios.get(studentUrl)
      .then((studentResponse) => {
        this.setState({
          student: studentResponse.data,
        });
      })
      .catch((error) => console.log("Error: Cannot load Appointment Tile"));
  }

  // Converts Unix Epoch Timestamp to regular time
  epochToDate(epoch) {
    var date = new Date(epoch * 1000);
    return date.toLocaleTimeString([], { timeStyle: "short" });
  }

  render() {
    let student = this.state.student;
    let appointment = this.props.appointment;

    return student != null ? (
      <button
        key={appointment.appointment_id}
        className="btn border border-dark p-4 w-100"
        onClick={() => this.props.appointmentSelected(appointment)}
      >
        <h2>
          {student.first_name} {student.last_name}
        </h2>
        <div className="d-flex justify-content-between">
          <b>{student.sfsu_id}</b>
          <b>{appointment.type}</b>
          <b>
            {this.epochToDate(appointment.start)} -{" "}
            {this.epochToDate(appointment.end)}
          </b>
        </div>
      </button>
    ) : (
      ""
    );
  }
}

export default AppointmentTile;
