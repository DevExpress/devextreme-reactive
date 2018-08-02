import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  allDayAppointmentsRects,
  getMessagesFormatter,
  HORIZONTAL_APPOINTMENT_TYPE,
} from '@devexpress/dx-scheduler-core';

const getAppointmentStyle = ({
  top,
  left,
  width,
  height,
}) => ({
  height,
  width: `${width}%`,
  transform: `translateY(${top}px)`,
  left: `${left}%`,
  position: 'absolute',
});

const pluginDependencies = [
  { name: 'WeekView' }, // Or Day View
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

const AppointmentPlaceholder = props => (
  <TemplatePlaceholder name="appointment" params={props} />
);

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
      appointmentsContainerComponent: AppointmentsContainer,
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
      textComponent: Text,
      messages,
    } = this.props;
    const { tableRef } = this.state;
    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        {tableRef && <Getter name="allDayPanelRef" value={tableRef} />}
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
                    {tableRef ? allDayAppointmentRects.map(({ dataItem, ...geometry }, index) => {
                      const appointmentProps = {
                        style: getAppointmentStyle(geometry),
                        type: HORIZONTAL_APPOINTMENT_TYPE,
                        key: index.toString(),
                        getTitle: getAppointmentTitle,
                        getEndDate: getAppointmentEndDate,
                        getStartDate: getAppointmentStartDate,
                        appointment: dataItem,
                      };
                      return <AppointmentPlaceholder {...appointmentProps} />;
                    }) : null}
                  </AppointmentsContainer>
                </Layout>
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="navbarEmpty">
          <TemplatePlaceholder />
          <Text getMessage={getMessage} />
        </Template>
      </Plugin>
    );
  }
}

AllDayPanel.propTypes = {
  appointmentsContainerComponent: PropTypes.func.isRequired,
  layoutComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  textComponent: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
};
