import React, { Component } from "react";

class AppointmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelDialog: false,
      saveButtonDisplayed: false,
      notes: null,
    };
  }

  epochToDate(epoch) {
    var date = new Date(epoch * 1000);
    return date.toLocaleTimeString([], { timeStyle: "short" });
  }

  handleJoinSession() {
    let { selected_appointment } = this.props;
    // Axios.get Zoom link from the app_id
  }

  handleCancelSession() {
    let { selected_appointment } = this.props;
    // Axios.delete appointment with specified app_id
  }

  saveNotes() {
    let { selected_appointment } = this.props;
    // Axios.put update notes of specified app_id
  }

  openCancelDialog() {
    this.setState({
      showCancelDialog: true,
    });
  }

  handleCancelDeclined() {
    this.setState({
      showCancelDialog: false,
    });
  }

  cancelDialog = () => {
    return (
      <div className="d-flex flex-column">
        <h4>Are you sure you want to cancel this session?</h4>
        <div className="d-flex justify-content-around">
          <button
            className="btn btn-info m-4 p-4"
            onClick={() => this.handleCancelSession()}
          >
            <b className="px-4">Yes</b>
          </button>
          <button
            className="btn btn-info m-4 p-4"
            onClick={() => this.handleCancelDeclined()}
          >
            <b className="px-4">No</b>
          </button>
        </div>
      </div>
    );
  };

  optionButtons = () => {
    return (
      <div className="d-flex justify-content-around ">
        <button
          className="btn btn-success rounded m-4 p-4"
          onClick={() => this.handleJoinSession()}
        >
          Join Session
        </button>
        <button
          className="btn btn-danger rounded m-4 p-4"
          onClick={() => this.openCancelDialog()}
        >
          Cancel Session
        </button>
      </div>
    );
  };

  handleTempTextChange = (e) => {
    this.setState({
      notes: e.target.value,
    });
  };

  render() {
    let { selected_appointment } = this.props;
    let { showCancelDialog } = this.state;
    return (
      <div className="text-center m-4">
        <div className="d-flex flex-column m-4">
          <h2>{selected_appointment.name}</h2>
          <b>
            {this.epochToDate(selected_appointment.start)} -
            {this.epochToDate(selected_appointment.end)}
          </b>
        </div>
        <div className="d-flex flex-column my-4">
          <div className="d-flex m-2">
            <h4>Additional Notes / Comments: </h4>
            <button
              className="btn btn-primary rounded mx-4 px-4"
              onClick={() => this.saveNotes()}
            >
              Save
            </button>
          </div>
          <textarea
            name="selected_app-student_notes"
            id="student-notes"
            cols="100"
            rows="10"
            value={selected_appointment.notes}
            onChange={this.handleTempTextChange}
          ></textarea>
        </div>
        {showCancelDialog ? this.cancelDialog() : this.optionButtons()}
      </div>
    );
  }
}

export default AppointmentDetail;
