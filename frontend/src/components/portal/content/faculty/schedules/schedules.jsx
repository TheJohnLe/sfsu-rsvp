import React, { Component } from 'react';
import Axios from 'axios';

class Schedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: "",
      zoom: "",
    };

    this.handleZoomChange = this.handleZoomChange.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    //TODO: ZOOM LINK
    let zoomURL =
      "http://localhost:5000/faculty/" + this.props.session_key + "/zoom";

    let scheduleURL =
      "http://localhost:5000/faculty/" + this.props.session_key + "/schedules";

    await Axios.all([Axios.get(zoomURL), Axios.get(scheduleURL)]).then(
      Axios.spread((zoomResponse, scheduleResponse) => {
        // Temporary Schedule Storage
        var schedule = [];
        var monday = { day: "MON", timeslots: [] };
        var tuesday = { day: "TUE", timeslots: [] };
        var wednesday = { day: "WED", timeslots: [] };
        var thursday = { day: "THU", timeslots: [] };
        var friday = { day: "FRI", timeslots: [] };

        // Loop through each day and store into temp arrays
        for (var i = 0; i < scheduleResponse.data.length; i++) {
          switch (scheduleResponse.data[i].day) {
            case 1:
              monday.timeslots.push(scheduleResponse.data[i]);
              break;
            case 2:
              tuesday.timeslots.push(scheduleResponse.data[i]);
              break;
            case 3:
              wednesday.timeslots.push(scheduleResponse.data[i]);
              break;
            case 4:
              thursday.timeslots.push(scheduleResponse.data[i]);
              break;
            case 5:
              friday.timeslots.push(scheduleResponse.data[i]);
              break;
          }
        }

        // Push each day-array into complete schedule-array
        schedule.push(monday, tuesday, wednesday, thursday, friday);

        this.setState({
          schedule: schedule,
          zoom: zoomResponse.data[0].zoom,
        });
      })
    );
  }

  showCancelMessage = (timeslot) => {
    return (
      <div className="d-flex flex-column text-center">
        <h4>Cancelling the following Schedule:</h4>
        <b>{timeslot.advising_type}</b>
        <b>
          {timeslot.start} - {timeslot.end}
        </b>
        <button className="btn btn-danger">Confirm</button>
      </div>
    );
  };

  handleZoomChange(event) {
    this.setState({
      zoom: event.target.value,
    });
  }

  render() {
    let { schedule, zoom } = this.state;
    return (
      <div className="content-panel d-flex flex-column">
        <div className="d-flex flex-column w-100 ">
          <div className="d-flex m-4">
            <b className="mx-4">Zoom Link</b>
            <input
              type="text"
              name="zoom-link"
              id="zoom-link"
              size={50}
              value={zoom}
              //onChange={this.handleZoomChange}
              readOnly={true}
            />
          </div>
          <div>
            {schedule.length > 0 ? (
              <div
                className="d-flex justify-content-around flex-grow-0"
                style={{ flexBasis: "20%" }}
              >
                {schedule.map((dayOfWeek) => (
                  <div
                    className="d-flex flex-column p-4 border"
                    key={dayOfWeek.day}
                  >
                    <h2 className="text-center border-top border-bottom m-4">
                      {dayOfWeek.day}
                    </h2>
                    <div className="d-flex flex-column">
                      {dayOfWeek.timeslots.length > 0
                        ? dayOfWeek.timeslots.map((timeslot) => (
                            <button
                              key={timeslot.schedule_id}
                              className="btn btn-info m-2 px-4"
                            >
                              <div className="d-flex flex-column">
                                <b>{timeslot.advising_type}</b>
                                <b>
                                  {timeslot.start} - {timeslot.end}
                                </b>
                              </div>
                            </button>
                          ))
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Schedules;