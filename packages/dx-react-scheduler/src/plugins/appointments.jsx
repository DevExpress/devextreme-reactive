import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplateConnector, DragSource,
} from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
];

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      appointmentContentComponent: AppointmentContent,
    } = this.props;

    return (
      <Plugin
        name="Appointments"
        dependencies={pluginDependencies}
      >
        <TemplateConnector>
          {(getters, actions) => (
            <Template
              name="appointment"
            >
              {({
                onClick, onDoubleClick,
                data, type, style, drag,
                ...restParams
              }) => {
                const DraggingAppointment = getters.appointmentTemplate;

                if (getters.draggingPredicate && getters.draggingPredicate(data)) {
                  return (
                    <DragSource
                      payload={[{
                        type,
                        data,
                        style,
                        changeAppointment: actions.changeAppointment,
                        commitChangedAppointment: actions.commitChangedAppointment,
                        viewBoundaries: { start: getters.startViewDate, end: getters.endViewDate },
                        excludedDays: getters.excludedDays,
                        viewCellsData: getters.viewCellsData,
                      }]}
                    >
                      {!drag ? (
                        <Appointment
                          style={{ ...style, cursor: 'pointer' }}
                          data={data}
                          {...createClickHandlers(onClick, onDoubleClick)}
                          {...restParams}
                        >
                          <AppointmentContent
                            data={data}
                            type={type}
                          />
                        </Appointment>
                      ) : (
                        <DraggingAppointment style={style} data={data} />
                      )}
                    </DragSource>
                  );
                }
                return (
                  <Appointment
                    style={style}
                    data={data}
                    {...createClickHandlers(onClick, onDoubleClick)}
                    {...restParams}
                  >
                    <AppointmentContent
                      data={data}
                      type={type}
                    />
                  </Appointment>
                );
              }}
            </Template>
          )}
        </TemplateConnector>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
  appointmentContentComponent: PropTypes.func.isRequired,
};

Appointments.components = {
  appointmentComponent: 'Appointment',
  appointmentContentComponent: 'AppointmentContent',
};
