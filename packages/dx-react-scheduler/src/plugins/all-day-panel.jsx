import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  getAppointmentStyle,
  allDayAppointmentsRects,
  getMessagesFormatter,
  HORIZONTAL_APPOINTMENT_TYPE,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'WeekView' }, // Or Day View
];

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
        <Template name="navbar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              dayScale,
              currentView,
              appointments,
              startViewDate,
              endViewDate,
              excludedDays,
            }) => {
              if (currentView === 'month') return null; // currentView.type === month
              const appointmentRects = tableRef ? allDayAppointmentsRects(
                appointments,
                startViewDate,
                endViewDate,
                excludedDays,
                dayScale,
                tableRef.querySelectorAll('th'),
              ) : [];
              return (
                <Layout
                  allDayPanelRef={this.allDayPanelRef}
                  cellComponent={Cell}
                  rowComponent={Row}
                  dayScale={dayScale}
                >
                  <AppointmentsContainer>
                    {tableRef ? appointmentRects.map(({ dataItem, ...geometry }, index) => {
                      const appointmentProps = {
                        style: getAppointmentStyle(geometry),
                        type: HORIZONTAL_APPOINTMENT_TYPE,
                        key: index.toString(),
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
