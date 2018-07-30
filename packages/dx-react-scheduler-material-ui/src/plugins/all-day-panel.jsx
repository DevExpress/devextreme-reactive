import * as React from 'react';
import { AllDayPanel as AllDayPanelBase } from '@devexpress/dx-react-scheduler';
import { Appointment } from '../templates/all-day-panel/appointment';
import { HorizontalAppointment } from '../templates/appointment/appointments';
import { Container } from '../templates/all-day-panel/container';
import { Layout } from '../templates/all-day-panel/layout';
import { Cell } from '../templates/all-day-panel/cell';
import { Row } from '../templates/all-day-panel/row';

export class AllDayPanel extends React.PureComponent {
  render() {
    return (
      <AllDayPanelBase
        appointmentComponent={Appointment}
        appointmentComponent2={HorizontalAppointment}
        appointmentsContainerComponent={Container}
        layoutComponent={Layout}
        cellComponent={Cell}
        rowComponent={Row}
        {...this.props}
      />
    );
  }
}
