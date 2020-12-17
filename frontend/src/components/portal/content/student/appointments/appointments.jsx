import React, { Component } from "react";

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todaysDate: null,
    };
  }

  componentDidMount() {
    this.todaysDate();
  }

  todaysDate = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    var day = date.getDate();
    var todaysDate = month + "/" + day + "/" + year;

    this.setState({
      todaysDate: todaysDate,
    });
  };

  onChangeAppointment(appointment) {
    this.props.chooseAppointment(appointment);
  }

  epochToTime(epoch) {
    var date = new Date(epoch * 1000);
    return date.toLocaleTimeString([], { timeStyle: "short" });
  }

  epochToDate(epoch) {
    var fullDate = new Date(epoch * 1000);
    var month = fullDate.getMonth() + 1;
    var day = fullDate.getDate();
    var year = fullDate.getFullYear();

    var today = new Date();
    var todaysMonth = today.getMonth() + 1;
    var todaysDay = today.getDate();
    var todaysYear = today.getFullYear();

    if (month === todaysMonth && day === todaysDay && year === todaysYear) {
      return "Today";
    }

    var date = month + "/" + day + "/" + year;

    return date;
  }

  render() {
    let { listOfAppointments } = this.props;
    let { todaysDate } = this.state;

    return (
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between border border-bottom">
          <b className="my-auto ml-3">{todaysDate}</b>
          <button
            className="m-1 btn btn-success m-2"
            onClick={this.props.newAppButtonPressed}
          >
            New Appointment
          </button>
        </div>
        <div className="text-center">
          <b>Current Appointments</b>
        </div>
        <div>
          {listOfAppointments.length > 0
            ? listOfAppointments.map((appointment) => (
                <button
                  key={appointment.app_id}
                  className="btn text-center w-100 border border-top border-bottom bg-light p-4"
                  onClick={() => this.onChangeAppointment(appointment)}
                >
                  <h4 className="border-bottom">{appointment.name}</h4>
                  <div className="d-flex justify-content-between">
                    <h5>{this.epochToDate(appointment.start)}</h5>
                    <h5>
                      {this.epochToTime(appointment.start)} -{" "}
                      {this.epochToTime(appointment.end)}
                    </h5>
                  </div>
                </button>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Appointments;
