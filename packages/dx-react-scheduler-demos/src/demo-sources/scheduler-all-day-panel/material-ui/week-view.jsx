import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { connectProps } from '@devexpress/dx-react-core';
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
  DragDropProvider,
  Toolbar,
  ViewSwitcher,
  MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../../demo-data/appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date('2018-06-27'),
      dragId: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);

    this.appointmentComponent = (args) => {
      // const { dragId } = this.state;
      if (args.data.drag) return <Appointments.Appointment {...args} style={{ ...args.style, opacity: 0.5 }} />;
      return <Appointments.Appointment {...args} />;
    };

    this.legendLabel = connectProps(this.appointmentComponent, () => {
      const { dragId } = this.state;
      return {
        dragId,
      };
    });
  }

  // static getDerivedStateFromProps(nextProps, nextState) {
  //   // return {};
  //   if (dragId !== nextState.dragId) {
  //     return { data: data.slice() };
  //   }
  // }

  commitChanges({ added, changed, deleted, dragId }) {
    let { data } = this.state;
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [
        ...data,
        {
          id: startingAddedId,
          ...added,
        },
      ];
    }
    if (changed) {
      data = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id], drag: false } : appointment));
    }
    if (deleted) {
      data = data.filter(appointment => appointment.id !== deleted);
    }
    if (dragId !== undefined) {
      data = data.map(appointment => (
        appointment.id === dragId ? { ...appointment, drag: true } : appointment
      ));
    }
    this.setState({ data });
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper style={{ margin: '0px' }}>
        <Scheduler
          data={data}
        >

          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <ViewState
            defaultCurrentDate={currentDate}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <Appointments
            appointmentComponent={this.appointmentComponent}
          />
          <AllDayPanel />

          <Toolbar />
          <ViewSwitcher />

          <DragDropProvider
            onDragIdChange={(id) => { /*this.commitChanges({ dragId: id });*/ }}
          />

        </Scheduler>
      </Paper>
    );
  }
}
