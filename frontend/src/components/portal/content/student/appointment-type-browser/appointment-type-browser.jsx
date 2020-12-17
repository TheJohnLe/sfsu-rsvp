import React, { Component } from "react";

class AppointmentTypeBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advising_types: [
        {
          name: "UNDERGRADUATE",
          full: "Undergraduate Advising",
          short: "UG",
        },
        {
          name: "TRANSFER",
          full: "Transfer Advising",
          short: "TR",
        },
        {
          name: "PROBATION",
          full: "Probation Advising",
          short: "PR",
        },
        {
          name: "GRADUATE",
          full: "Graduate Advising",
          short: "GR",
        },
      ],
    };
  }

  onTypeClicked = (advising_type) => {
    this.props.typeSelected(advising_type);
  };

  render() {
    let { advising_types } = this.state;
    return (
      <div className="d-flex flex-column text-center h-100 m-4">
        <h1 className="m-4">Browse</h1>
        {advising_types.map((advising_type) => (
          <div
            className="py-4 mx-4 my-2 border bg-primary"
            key={advising_type.short}
            onClick={() => this.onTypeClicked(advising_type)}
          >
            <b>{advising_type.name}</b>
          </div>
        ))}
      </div>
    );
  }
}

export default AppointmentTypeBrowser;
