import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  getAppointmentStyle,
  calculateRectByDateIntervals,
  calculateAllDayDateIntervals,
  getAllDayRectByDates,
  HORIZONTAL_APPOINTMENT_TYPE,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'WeekView', optional: true },
];

const defaultMessages = {
  allDay: 'All Day',
};

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
      containerComponent: Container,
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
      textComponent: Text,
      messages,
    } = this.props;
    const { tableRef } = this.state;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        <Template name="navbarEmpty">
          <TemplatePlaceholder />
          <Text getMessage={getMessage} />
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              dayScale, currentView, appointments, startViewDate, endViewDate, excludedDays,
            }) => {
              if (currentView === 'month') return null;
              const intervals = calculateAllDayDateIntervals(
                appointments, startViewDate, endViewDate, excludedDays,
              );
              const rects = tableRef ? calculateRectByDateIntervals(
                {
                  growDirection: HORIZONTAL_APPOINTMENT_TYPE,
                  multiline: false,
                },
                intervals,
                getAllDayRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  dayScale,
                  excludedDays,
                  cellElements: tableRef.querySelectorAll('th'),
                },
              ) : [];
              return (
                <Layout
                  allDayPanelRef={this.allDayPanelRef}
                  cellComponent={Cell}
                  rowComponent={Row}
                  dayScale={dayScale}
                >
                  <Container>
                    {rects.map(({ dataItem, type, ...geometry }, index) => (
                      <AppointmentPlaceholder
                        style={getAppointmentStyle(geometry)}
                        type={type}
                        key={index.toString()}
                        appointment={dataItem}
                      />
                    ))}
                  </Container>
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
  containerComponent: PropTypes.func.isRequired,
  layoutComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  textComponent: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    allDay: PropTypes.string,
  }),
};

AllDayPanel.defaultProps = {
  messages: {},
};

AllDayPanel.components = {
  containerComponent: 'Container',
  layoutComponent: 'Layout',
  cellComponent: 'Cell',
  rowComponent: 'Row',
  textComponent: 'Text',
};
