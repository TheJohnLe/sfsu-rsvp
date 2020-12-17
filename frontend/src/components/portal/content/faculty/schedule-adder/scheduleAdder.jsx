import React, { Component } from 'react';
import Axios from 'axios'

class ScheduleAdder extends Component {
    constructor(props) {
      super(props);
      this.state = {
        advising_type: "",
        mondaySelected: false,
        tuesdaySelected: false,
        wednesdaySelected: false,
        thursdaySelected: false,
        fridaySelected: false,
        startTime: "",
        endTime: "",
        partitionSelected: false,
        partitionTime: "",
      };
  
      this.handleTypeChange = this.handleTypeChange.bind(this);
      this.handleMondayChange = this.handleMondayChange.bind(this);
      this.handleTuesdayChange = this.handleTuesdayChange.bind(this);
      this.handleWednesdayChange = this.handleWednesdayChange.bind(this);
      this.handleThursdayChange = this.handleThursdayChange.bind(this);
      this.handleFridayChange = this.handleFridayChange.bind(this);
      this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
      this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
      this.handlePartitionTimeChange = this.handlePartitionTimeChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
      this.advisingTypeEntered = this.advisingTypeEntered.bind(this);
      this.timeRangeEntered = this.timeRangeEntered.bind(this);
      this.startTimeEntered = this.startTimeEntered.bind(this);
      this.endTimeEntered = this.endTimeEntered.bind(this);
      this.daySelected = this.daySelected.bind(this);
    }
  
    closeSettings = () => {
      this.props.homeButtonClicked();
    };
  
    partitionBoxClicked = (event) => {
      this.setState({
        partitionSelected: !this.state.partitionSelected,
      });
    };
  
    handleTypeChange = (event) => {
      this.setState({
        advising_type: event.target.value,
      });
    };
  
    handleMondayChange(event) {
      this.setState({
        mondaySelected: !this.state.mondaySelected,
      });
    }
  
    handleTuesdayChange(event) {
      this.setState({
        tuesdaySelected: !this.state.tuesdaySelected,
      });
    }
  
    handleWednesdayChange(event) {
      this.setState({
        wednesdaySelected: !this.state.wednesdaySelected,
      });
    }
  
    handleThursdayChange(event) {
      this.setState({
        thursdaySelected: !this.state.thursdaySelected,
      });
    }
  
    handleFridayChange(event) {
      this.setState({
        fridaySelected: !this.state.fridaySelected,
      });
    }
  
    handleStartTimeChange(event) {
      this.setState({
        startTime: event.target.value,
      });
    }
  
    handlePartitionTimeChange(event) {
      this.setState({
        partitionTime: event.target.value,
      });
    }
  
    handleEndTimeChange(event) {
      this.setState({
        endTime: event.target.value,
      });
    }
  
    // TODO: Force ScheduleView to refresh
    // TODO: Prevent duplicate timeslots
    async handleSubmit(event) {
      event.preventDefault();
  
      let {
        advising_type,
        mondaySelected,
        tuesdaySelected,
        wednesdaySelected,
        thursdaySelected,
        fridaySelected,
        startTime,
        endTime,
        partitionSelected,
        partitionTime,
      } = this.state;
  
      if (this.advisingTypeEntered && this.daySelected && this.timeRangeEntered) {
        var schedules = [];
  
        // "HH:MM" -> ["HH","MM"]
        startTime = startTime.split(":");
        endTime = endTime.split(":");
        startTime = Number(startTime[0] + startTime[1]);
        endTime = Number(endTime[0] + endTime[1]);
  
        if (mondaySelected) {
          // If partion option is selected, partition the timeslots
          if (partitionSelected) {
            this.partitionTime(
              advising_type,
              startTime,
              endTime,
              1,
              partitionTime
            );
            // else post schedule using inputed time frame
          } else {
            var f_id = await this.retrieveId();
            this.postSchedule(advising_type, f_id, 1, startTime, endTime);
          }
        }
        if (tuesdaySelected) {
          // If partion option is selected, partition the timeslots
          if (partitionSelected) {
            this.partitionTime(
              advising_type,
              startTime,
              endTime,
              2,
              partitionTime
            );
            // else post schedule using inputed time frame
          } else {
            var f_id = await this.retrieveId();
            this.postSchedule(advising_type, f_id, 2, startTime, endTime);
          }
        }
        if (wednesdaySelected) {
          // If partion option is selected, partition the timeslots
          if (partitionSelected) {
            this.partitionTime(
              advising_type,
              startTime,
              endTime,
              3,
              partitionTime
            );
            // else post schedule using inputed time frame
          } else {
            var f_id = await this.retrieveId();
            this.postSchedule(advising_type, f_id, 3, startTime, endTime);
          }
        }
        if (thursdaySelected) {
          // If partion option is selected, partition the timeslots
          if (partitionSelected) {
            this.partitionTime(
              advising_type,
              startTime,
              endTime,
              4,
              partitionTime
            );
            // else post schedule using inputed time frame
          } else {
            var f_id = await this.retrieveId();
            this.postSchedule(advising_type, f_id, 4, startTime, endTime);
          }
        }
        if (fridaySelected) {
          // If partion option is selected, partition the timeslots
          if (partitionSelected) {
            this.partitionTime(
              advising_type,
              startTime,
              endTime,
              5,
              partitionTime
            );
            // else post schedule using inputed time frame
          } else {
            var f_id = await this.retrieveId();
            this.postSchedule(advising_type, f_id, 5, startTime, endTime);
          }
        }
      }
    }
  
    /* API: Retrieve faculty ID */
    async retrieveId() {
      let facultyUrl =
        "http://localhost:5000/faculties/" + this.props.session_key;
  
      var f_id = "";
  
      // Retrieve f_id from session
      await Axios.get(facultyUrl)
        .then((response) => {
          f_id = response.data[0].f_id;
        })
        .catch((error) => console.log("error", error));
  
      return f_id;
    }
  
    /* API: Posts an individual timeslot */
    async postSchedule(advising_type, f_id, day, startTime, endTime) {
      let scheduleUrl = "http://localhost:5000/schedules";
  
      var timeslotAvailable = await this.timeslotAvailable(day, startTime);
      console.log("test this timeslotAvailable", timeslotAvailable);
      if (timeslotAvailable === true) {
        // Post timeslot to the schedule-database
        await Axios.post(scheduleUrl, {
          f_id: f_id,
          type: advising_type,
          day: day,
          start: startTime,
          end: endTime,
        })
          .then((response) => {
            console.log("Adding timeslot", response);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    }
  
    async timeslotAvailable(inputtedDay, startTime) {
      console.log("testing timeslotAvailable");
      var success = true;
      // If startTime is between any current timeslots,
      // return false
      let scheduleUrl =
        "http://localhost:5000/schedules/faculty/" + this.props.session_key;
  
      await Axios.get(scheduleUrl)
        .then((response) => {
          var schedule = response.data;
          for (var i = 0; i < schedule.length; i++) {
            if (
              inputtedDay === schedule[i].day &&
              startTime >= schedule[i].start &&
              startTime <= schedule[i].end
            ) {
              console.log("Requested schedule conflicts with existing timeslot.");
              success = false;
            }
          }
        })
        .catch((error) =>
          console.log("Error checking if timeslot is available:", error)
        );
  
      return success;
    }
  
    async partitionTime(advising_type, startTime, endTime, day, partitionAmount) {
      // Format parameters to valid data types
      day = Number(day);
      partitionAmount = Number(partitionAmount);
  
      // Retrieve faculty id
      var f_id = await this.retrieveId();
  
      // Not necessary, for personal legability
      var time = startTime;
  
      // Cycle through each partition time
      while (time <= endTime) {
        // HHMM -> timeHr = H || HH; timeMn = M || MM
        var timeHr = parseInt(time / 100);
        var timeMn = time - timeHr * 100;
  
        // Temp create timeslot endtime for specific partition
        var endHr = timeHr;
        var endMn = timeMn + Number(partitionAmount);
        if (endMn >= 60) {
          endHr++;
          endMn -= 60;
        }
        if (endMn < 10) {
          endMn = "0" + endMn.toString();
        }
        var end = endHr.toString() + endMn.toString();
  
        // Post partition timeslot to the schedule-database
        this.postSchedule(advising_type, f_id, day, time, end);
  
        // Increment partition here
        if (timeMn + partitionAmount >= 60) {
          timeHr++;
          timeMn -= 60;
        } else {
          timeMn += partitionAmount;
        }
  
        // Clean up hr/mn conversions for next cycle
        if (timeHr < 10) {
          timeHr = "0" + timeHr.toString();
        } else {
          timeHr = timeHr.toString();
        }
        if (timeMn === 0) {
          timeMn = "00";
        } else {
          timeMn = timeMn.toString();
        }
        var temp = [timeHr, timeMn];
        time = Number(temp[0] + temp[1]);
      }
    }
  
    /* Boolean to check advising type condition */
    advisingTypeEntered = () => {
      let { advising_type } = this.state;
  
      if (advising_type !== "") return true;
  
      return false;
    };
  
    /* Boolean to check any day selection condition */
    daySelected = () => {
      let {
        mondaySelected,
        tuesdaySelected,
        wednesdaySelected,
        thursdaySelected,
        fridaySelected,
      } = this.state;
  
      if (
        mondaySelected ||
        tuesdaySelected ||
        wednesdaySelected ||
        thursdaySelected ||
        fridaySelected
      )
        return true;
  
      return false;
    };
  
    /* Boolean to check if time range was entered */
    timeRangeEntered = () => {
      if (this.startTimeEntered && this.endTimeEntered) return true;
  
      return false;
    };
  
    startTimeEntered = () => {
      let { startTime } = this.state;
  
      if (startTime !== "") return true;
  
      return false;
    };
  
    endTimeEntered = () => {
      let { endTime } = this.state;
  
      if (endTime !== "") return true;
  
      return false;
    };
  
    render() {
      return (
        <div className="d-flex flex-column">
          <button
            className="btn btn-primary border border-dark"
            onClick={this.closeSettings}
          >
            Home
          </button>
          <form onSubmit={this.handleSubmit}>
            <div
              className="d-flex justify-content-around m-2 py-2 border-bottom"
              value={this.state.advising_type}
              onChange={this.handleTypeChange}
            >
              <label>
                <b>Advising Type</b>
              </label>
              <select id="advising_type" name="advising_type" required>
                <option selected disabled>
                  NA
                </option>
                <option value="UG">UG</option>
                <option value="TR">TR</option>
                <option value="PR">PR</option>
                <option value="GR">GR</option>
              </select>
            </div>
            <table
              style={{ tableLayout: "fixed" }}
              className="w-100 text-center"
              required
            >
              <tr>
                <td>
                  <label>
                    <b>MON</b>
                  </label>
                </td>
                <td>
                  <label>
                    <b>TUE</b>
                  </label>
                </td>
                <td>
                  <label>
                    <b>WED</b>
                  </label>
                </td>
                <td>
                  <label>
                    <b>THU</b>
                  </label>
                </td>
                <td>
                  <label>
                    <b>FRI</b>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="monday"
                    id="monday"
                    onChange={this.handleMondayChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="tuesday"
                    id="tuesday"
                    onChange={this.handleTuesdayChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="wednesday"
                    id="wednesday"
                    onChange={this.handleWednesdayChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="thursday"
                    id="thursday"
                    onChange={this.handleThursdayChange}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="friday"
                    id="friday"
                    onChange={this.handleFridayChange}
                  />
                </td>
              </tr>
            </table>
            <table className="w-100 my-2">
              <tr className="px-4">
                <td>
                  <b>Start Time:</b>
                </td>
                <td className="text-right">
                  <input
                    type="time"
                    className="mx-2"
                    name="start"
                    id="start_time"
                    value={this.state.startTime}
                    onChange={this.handleStartTimeChange}
                    required
                  />
                </td>
              </tr>
              <tr className="px-4">
                <td>
                  <b>End Time:</b>
                </td>
                <td className="text-right">
                  <input
                    type="time"
                    className="mx-2"
                    name="end"
                    id="end_time"
                    value={this.state.endTime}
                    onChange={this.handleEndTimeChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="partition-toggle">
                    <b>Partition?</b>
                  </label>
                </td>
                <td className="text-right">
                  <input
                    type="checkbox"
                    name="partition-toggle"
                    className="mx-3"
                    value={this.state.partitionSelected}
                    onChange={this.partitionBoxClicked}
                  />
                </td>
              </tr>
              {this.state.partitionSelected ? (
                <tr>
                  <td>
                    <b>Time/Session</b>
                  </td>
                  <td className="text-right">
                    <div className="mx-2">
                      <input
                        type="number"
                        name="partition-amount"
                        id="partition-amount"
                        size={8}
                        value={this.state.partitionTime}
                        onChange={this.handlePartitionTimeChange}
                      />{" "}
                      min
                    </div>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </table>
            <div className="text-center m-4">
              <input className="btn btn-info p-2" type="submit" value="Add" />
            </div>
          </form>
        </div>
      );
    }
  }
 
export default ScheduleAdder;