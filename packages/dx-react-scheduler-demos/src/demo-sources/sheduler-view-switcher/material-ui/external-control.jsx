import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { ViewState } from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  WeekView,
  Toolbar,
  Appointments,
  MonthView,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/month-appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentViewName: 'Week',
    };
    this.currentViewNameChange = (e) => {
      this.setState({ currentViewName: e.target.value });
    };
  }

  render() {
    const { data, currentViewName } = this.state;

    return (
      <React.Fragment>
        <RadioGroup
          aria-label="Views"
          style={{ flexDirection: 'row' }}
          name="views"
          value={currentViewName}
          onChange={this.currentViewNameChange}
        >
          <FormControlLabel value="Week" control={<Radio />} label="Week" />
          <FormControlLabel value="Work Week" control={<Radio />} label="Work Week" />
          <FormControlLabel value="Month" control={<Radio />} label="Month" />
        </RadioGroup>
        <Paper>
          <Scheduler
            data={data}
          >
            <ViewState
              defaultCurrentDate="2018-07-25"
              currentViewName={currentViewName}
            />
            <WeekView
              startDayHour={10}
              endDayHour={19}
            />
            <WeekView
              name="Work Week"
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <Appointments />
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}
