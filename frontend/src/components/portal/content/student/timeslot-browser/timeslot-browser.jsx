import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./timeslot-browser.css";

class TimeslotBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_app_selection: null,
      week: [
        {
          dayInt: 1 /* Monday */,
          dayOfMonth: null,
          timeslots: [],
        },
        {
          dayInt: 2 /* Tuesday */,
          dayOfMonth: null,
          timeslots: [
            {
              app_id: 5,
              start: "12:15 PM",
              end: "12:30 PM",
            },
            {
              app_id: 6,
              start: "12:45 PM",
              end: "1:00 PM",
            },
          ],
        },
        {
          dayInt: 3 /* Wednesday */,
          dayOfMonth: null,
          timeslots: [],
        },
        {
          dayInt: 4 /* Thursday */,
          dayOfMonth: null,
          timeslots: [
            {
              app_id: 15,
              start: "12:00 PM",
              end: "12:15 PM",
            },
            {
              app_id: 16,
              start: "12:15 PM",
              end: "12:30 PM",
            },
            {
              app_id: 25,
              start: "12:30 PM",
              end: "12:45 PM",
            },
            {
              app_id: 26,
              start: "12:45 PM",
              end: "1:00 PM",
            },
          ],
        },
        {
          dayInt: 5 /* Friday */,
          dayOfMonth: null,
          timeslots: [
            {
              app_id: 55,
              start: "4:15 PM",
              end: "4:30 PM",
            },
            {
              app_id: 56,
              start: "6:45 PM",
              end: "7:00 PM",
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.dayOfMonth();
  }

  dayOfMonth() {
    //get today's date
    var curr = new Date();

    // Add +1 to skip Sunday
    var dayOfMonth = curr.getDate() - curr.getDay() + 1;

    // Retrieve the last numeric day of the month
    var lastDateOfMonth = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    var lastDayOfMonth = lastDateOfMonth.getDate();

    for (var i = 0; i < 5; i++) {
      // If the last day of the month is midway of the week
      // Reset dayOfMonth counter to 0 to be incremented
      if (dayOfMonth > lastDayOfMonth) {
        dayOfMonth = 0;
      }

      // Copy entire week state
      var temp = this.state.week;

      // Replace date of each week by the numeric day
      temp[i].dayOfMonth = dayOfMonth++;
    }

    // Overwrite the week state with the new days of week
    this.setState({
      week: temp,
    });
  }

  dayIntToString(intDay) {
    switch (intDay) {
      case 0:
        return "SUN";
      case 1:
        return "MON";
      case 2:
        return "TUE";
      case 3:
        return "WED";
      case 4:
        return "THU";
      case 5:
        return "FRI";
      case 6:
        return "SAT";
      default:
        return "n/a";
    }
  }

  updateSelectedApp(selection) {
    this.setState({
      current_app_selection: selection,
    });
  }

  handleCancelSelection() {
    this.setState({
      current_app_selection: null,
    });
  }

  handleCreateApp = (appointment) => {
    this.props.appointmentPicked(appointment);
  };

  render() {
    let { advising } = this.props;
    let { week, current_app_selection } = this.state;

    return (
      <div className="w-100 text-center">
        {/* Open Prompt to Confirm Selected Appointment */}
        {current_app_selection !== null ? (
          <div className="selection-container position-absolute border d-flex flex-column justify-content-center align-items-center w-100">
            <div className="p-4 d-flex flex-column justify-content-center align-items-center border border-secondary rounded bg-light">
              <h2>{advising.full}</h2>

              <h6>
                {current_app_selection.start} - {current_app_selection.end}
              </h6>

              <div className="d-flex flex-column my-4">
                <label htmlFor="studentComments" className="text-left">
                  Additional Notes/Comments:{" "}
                </label>
                <textarea
                  id="studentComments"
                  name="studentComments"
                  rows="5"
                  cols="50"
                ></textarea>
              </div>

              <div className=" d-flex justify-content-between m-4">
                <button
                  className="btn btn-success mx-2"
                  onClick={() => this.handleCreateApp(current_app_selection)}
                >
                  <b>Create Appointment</b>
                </button>
                <button
                  className="btn btn-danger  mx-2"
                  onClick={() => this.handleCancelSelection()}
                >
                  <b>Cancel Selection</b>
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Show the name of the Type and the Timeslots */}
        <h1>{advising.full}</h1>

        <div className="d-flex justify-content-around m-4">
          {/* Populate days of week */}
          {week.map((dayOfWeek) => (
            <div
              key={dayOfWeek.dayInt}
              style={{ flexBasis: "20%" }}
              className="flex-grow-0 border"
            >
              <div className="d-flex flex-column border-bottom">
                <p className="display-4">{dayOfWeek.dayOfMonth}</p>
                <h3>{this.dayIntToString(dayOfWeek.dayInt)}</h3>
              </div>

              {/* Populate Timeslots */}
              <div className="d-flex flex-column m-4">
                {dayOfWeek.timeslots.map((timeslot) => (
                  <button
                    className="btn btn-info w-100 p-4 my-2"
                    key={timeslot.app_id + timeslot.start}
                    onClick={() => this.updateSelectedApp(timeslot)}
                  >
                    <b>
                      {" "}
                      {timeslot.start} - {timeslot.end}
                    </b>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TimeslotBrowser;
