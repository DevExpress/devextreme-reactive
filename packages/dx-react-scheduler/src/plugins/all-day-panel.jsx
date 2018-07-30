import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { allDayAppointmentsRects } from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'WeekView' },
];

const allDayAppointmentRectsComputed = ({
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  dayScale,
  allDayPanelRef,
}) => (allDayPanelRef ? allDayAppointmentsRects(
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  dayScale,
  allDayPanelRef.querySelectorAll('th'),
) : []);

export class AllDayPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableRef: null,
    };
    this.allDayPanelRef = this.allDayPanelRef.bind(this);
  }

  allDayPanelRef(ref) {
    this.setState({
      tableRef: ref,
    });
  }

  render() {
    const {
      appointmentComponent: Appointment,
      appointmentComponent2: HorizontalAppointment,
      appointmentsContainerComponent: AppointmentsContainer,
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
    } = this.props;

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        {this.state.tableRef && <Getter name="allDayPanelRef" value={this.state.tableRef} />}
        <Getter name="allDayAppointmentRects" computed={allDayAppointmentRectsComputed} />
        <Template name="navbar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              dayScale,
              currentView,
              allDayAppointmentRects,
              getAppointmentTitle,
              getAppointmentEndDate,
              getAppointmentStartDate,
            }) => {
              if (currentView === 'month') return null; // currentView.type === month
              return (
                <Layout
                  allDayPanelRef={this.allDayPanelRef}
                  cellComponent={Cell}
                  rowComponent={Row}
                  dayScale={dayScale}
                >
                  <AppointmentsContainer>
                    {this.state.tableRef ? allDayAppointmentRects.map(({ dataItem, ...geometry }, index) => {
                      const appointmentProps = {
                        ...geometry,
                        key: index.toString(),
                        getTitle: getAppointmentTitle,
                        getEndDate: getAppointmentEndDate,
                        getStartDate: getAppointmentStartDate,
                        appointment: dataItem,
                      };
                      return <HorizontalAppointment {...geometry} {...appointmentProps} />;
                    }) : null}
                  </AppointmentsContainer>
                </Layout>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

AllDayPanel.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
  appointmentsContainerComponent: PropTypes.func.isRequired,
  layoutComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
};
