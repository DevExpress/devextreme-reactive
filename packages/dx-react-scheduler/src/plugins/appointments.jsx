import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, Getter, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import { getCoordinatesByDate } from '@devexpress/dx-scheduler-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      getTitle,
      getStartDate,
      getEndDate,
    } = this.props;

    const getDateTableCellElement = dateTableCellRefs => index => dateTableCellRefs[index];

    const getReactComputed = ({
      timeScale,
      dayScale,
      cellDuration,
      dateTableCellRefs,
    }) => date =>
      getCoordinatesByDate(
        dayScale,
        timeScale,
        cellDuration,
        date,
        getDateTableCellElement(dateTableCellRefs),
      );

    return (
      <Plugin name="Appointment">
        <Getter name="getAppointmentTitle" value={getTitle} />
        <Getter name="getAppointmentStartDate" value={getStartDate} />
        <Getter name="getAppointmentEndDate" value={getEndDate} />
        <Getter name="getRect" computed={getReactComputed} />

        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              data,
              getRect,
              dateTableCellRefs,
            }) =>
              (dateTableCellRefs ? data.map((appointment) => {
                const {
                  top, left, width, height,
                } = getRect(getStartDate(appointment));
                return (
                  <Appointment
                    key={appointment}
                    top={top}
                    left={left}
                    width={width}
                    height={height}
                    title={getTitle(appointment)}
                  />
                );
              }) : null)
            }
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
  getTitle: PropTypes.func,
  getStartDate: PropTypes.func,
  getEndDate: PropTypes.func,
};

Appointments.defaultProps = {
  getTitle: appointment => appointment.title,
  getStartDate: appointment => appointment.startDate,
  getEndDate: appointment => appointment.endDate,
};
