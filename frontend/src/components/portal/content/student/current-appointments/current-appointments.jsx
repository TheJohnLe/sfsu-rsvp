import React, { Component } from "react";
import Appointments from "../appointments/appointments";
import AppointmentDetail from "../appointments-detail/appointments-detail";
import Axios from "axios";

class CurrentAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      // [
      //   {
      //     app_id: 123,
      //     type: "UG",
      //     name: "Undergraduate Advising",
      //     start: "1596128400",
      //     end: "1596129300",
      //     notes: "Sample Notes 1",
      //   },
      //   {
      //     app_id: 124,
      //     type: "PR",
      //     name: "Probation Advising",
      //     start: "1596222900",
      //     end: "1596223800",
      //     notes: "Sample Notes 2",
      //   },
      //   {
      //     app_id: 125,
      //     type: "TR",
      //     name: "Transfer Advising",
      //     start: "1596583800",
      //     end: "1596584700",
      //     notes: "Sample Notes 3",
      //   },
      // ],
      selected_appointment: "",
      // {
      //   app_id: null,
      //   type: "",
      //   name: "",
      //   start: "",
      //   end: "",
      // },
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    let appointmentsUrl =
      "http://localhost:5000/appointments/student/" +
      this.props.session_key +
      "/active";

    var appointments = [];
    await Axios.get(appointmentsUrl)
      .then((appointmentResponse) => {
        console.log("appointmentResponse.data", appointmentResponse.data);
        appointments = appointmentResponse.data;
        for (var i = 0; i < appointments.length; i++) {
          appointments[i].name = this.getAdvisingTypeFullName(
            appointments[i].type
          );
        }
        this.setState({
          appointments: appointments,
          selected_appointment: appointments[0],
        });
      })
      .catch((error) =>
        console.log("Error retrieving student's appointments", error)
      );
  }

  getAdvisingTypeFullName(advising_shortname) {
    var advising_longname;

    switch (advising_shortname) {
      case "UG":
        advising_longname = "Undergraduate Advising";
        break;
      case "PR":
        advising_longname = "Probation Advising";
        break;
      case "TR":
        advising_longname = "Transfer Advising";
        break;
      case "GR":
        advising_longname = "Graduation Advising";
        break;
    }

    return advising_longname;
  }

  updateSelectedAppointment = (appointment) => {
    this.setState({
      selected_appointment: appointment,
    });
  };

  render() {
    return (
      <div className="d-flex w-100">
        <div className="w-25 border-right border-dark overflow-auto">
          <Appointments
            listOfAppointments={this.state.appointments}
            chooseAppointment={this.updateSelectedAppointment.bind(this)}
            newAppButtonPressed={this.props.newAppButtonPressed}
          />
        </div>

        <div className="w-75 overflow-auto">
          <AppointmentDetail
            selected_appointment={this.state.selected_appointment}
          />
        </div>
      </div>
    );
  }
}

export default CurrentAppointments;
