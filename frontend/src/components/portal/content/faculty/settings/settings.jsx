import React, { Component } from 'react';
import Schedules from '../schedules/schedules'
import ScheduleAdder from '../schedule-adder/scheduleAdder'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (<div className="w-100 h-100 d-flex">
        <div className="w-25 d-flex flex-column border scrollbar scrollbar-primary">
          <div className="d-flex justify-content-between border border-bottom">
          <ScheduleAdder homeButtonClicked={this.props.homeButtonClicked}/>
          </div>
        </div>
        <div className="w-100 px-4 py-2">
        <Schedules session_key={this.props.session_key}/>
        </div>
      </div>);
    }
}
 
export default Settings;