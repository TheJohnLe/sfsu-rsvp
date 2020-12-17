import React, { Component } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSlash,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

class AppointmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: "",
      history: [],
      sessionEnded: false
    };
  }

  componentDidMount() {
    this.fetchStudentName();
    this.fetchStudentHistory();
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
      .catch((error) => console.log("Error: Cannot load Student info"));
  }

  // ERROR: Cannot fetch faculty of appointment while fetching appointment
  // Possible solution: Refactor 'Appointments' table to include faculty name
  async fetchStudentHistory() {
    let student_id = this.props.appointment.student_id;
    let historyUrl =
      "http://localhost:5000/students/" + student_id + "/history";
    await Axios.get(historyUrl)
      .then((historyResponse) => {
        let history = historyResponse.data;
        // history.map((appointment) => {
        //   appointment.faculty = this.fetchFacultyNames(appointment.faculty_id);
        // });
        this.setState({
          history: history,
        });
      })
      .catch((error) =>
        console.log("Error: Cannot retrieve student's history.")
      );
  }

  // async fetchFacultyName(faculty_id) {
  //   let facultyUrl = "http://localhost:5000/user/" + faculty_id;
  //   await Axios.get(facultyUrl).then((response) => {
  //     console.log("trying to send this", response.data.last_name);
  //     var name = response.data.last_name;
  //     return name;
  //   });
  // }

  // Converts Unix Epoch Timestamp to regular time
  epochToDate(epoch) {
    var date = new Date(epoch * 1000);
    return date.toLocaleTimeString([], { timeStyle: "short" });
  }

  // Toggle "Appointment Summary" window
  showSessWindow = () => {
    this.setState({
      sessionEnded: true,
    });
  };

  hideSessWindow = () => {
    this.setState({
      sessionEnded: false,
    });
  };

  render() {
    let student = this.state.student;
    let history = this.state.history;
    let appointment = this.props.appointment;
    
    return student != null ? (
      <div>
        {/* If student is done with their appointment, show a post-session review */}
        {this.state.sessionEnded ? (
          <div className="post-appointment-window position-absolute d-flex flex-column text-center bg-primary border rounded p-4 text-light">
            <h2>Session Summary</h2>
            <h4>
              {appointment.first_name} {appointment.last_name}
            </h4>
            <div className="d-flex justify-content-between m-2">
              <b>Was Present?</b>
              <div>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="bg-success border rounded"
                />
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="bg-danger border rounded"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between m-2">
              <b>Was Late?</b>
              <div>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="bg-success border rounded"
                />
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="bg-danger border rounded"
                />
              </div>
            </div>
            <div className="d-flex flex-column m-4">
              <b>Additional Comments</b>
              <textarea
                name="faculty-comments-textarea faculty-comments"
                id="faculty-comments"
                cols="50"
                rows="2"
                style={{ resize: "none", maxWidth: "500px" }}
              ></textarea>
            </div>
            <button
              className="btn btn-info"
              onClick={this.hideSessWindow.bind(this)}
            >
              Done
            </button>
          </div>
        ) : null}

        {/** Student Appointment Panel here */}
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex flex-column">
            <h2>
              {student.first_name} {student.last_name}
            </h2>
            <h2>{student.email}</h2>
            <h2>{appointment.type}</h2>
          </div>
          <div className="d-flex flex-column">
            <h2>
              {this.epochToDate(appointment.start)} -{" "}
              {this.epochToDate(appointment.end)}
            </h2>
            <button
              className="btn btn-success"
              // onClick={this.showSessWindow.bind(this)}
            >
              Join Session
            </button>
          </div>
        </div>
        <div className="student-notes d-flex flex-column my-4">
          <h4>Additional Notes / Comments</h4>
          <textarea
            name="selected_app-student_notes"
            id="student-notes"
            cols="100"
            rows="5"
            //value={appointment.s_notes}
          ></textarea>
        </div>
        <div className="student-history d-flex flex-column my-4">
          <h4>History</h4>
          <table className="table table-striped table-bordered table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Faculty</th>
                <th scope="col">Joined</th>
                <th scope="col">On Time</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {/* Render student-history array here */}
            <tbody>
              {history.map((history, index) => (
                <tr key={history.start + index}>
                  <td>{this.epochToDate(history.start)}</td>
                  <td>{history.type}</td>
                  {/* TODO: CONVERT F-ID TO LAST NAME  */}
                  <td>{history.faculty}</td>
                  <td>
                    {history.joined === 1 ? (
                      <FontAwesomeIcon icon={faCheckCircle} />
                    ) : (
                      <FontAwesomeIcon icon={faTimesCircle} />
                    )}
                  </td>
                  <td>
                    {history.late === 1 ? (
                      <FontAwesomeIcon icon={faCheckCircle} />
                    ) : (
                      <FontAwesomeIcon icon={faTimesCircle} />
                    )}
                  </td>
                  <td>
                    {history.notes !== "" ? (
                      <button className="btn btn-primary">More Info</button>
                    ) : (
                      <button className="btn btn-secondary disabled">
                        More Info
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default AppointmentDetails;
