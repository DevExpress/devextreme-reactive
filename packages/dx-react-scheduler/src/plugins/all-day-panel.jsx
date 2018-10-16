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
  allDayCells,
  getAppointmentStyle,
  calculateRectByDateIntervals,
  calculateAllDayDateIntervals,
  getAllDayRectByDates,
  HORIZONTAL_TYPE,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
];

const defaultMessages = {
  allDay: 'All Day',
};

const MONTH = 'Month';

export class AllDayPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableRef: null,
    };
    this.allDayPanelRef = this.allDayPanelRef.bind(this);

    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
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
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView === MONTH) return null;
              return (
                <Text getMessage={getMessage} />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              dayScale, currentView, appointments, startViewDate,
              endViewDate, excludedDays, viewCellsData,
            }) => {
              if (currentView.name === MONTH) return null;
              const intervals = calculateAllDayDateIntervals(
                appointments, startViewDate, endViewDate, excludedDays,
              );
              const rects = tableRef && tableRef.querySelectorAll('th').length === dayScale.length ? calculateRectByDateIntervals(
                {
                  growDirection: HORIZONTAL_TYPE,
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
              const { appointmentPlaceholder: AppointmentPlaceholder } = this;
              return (
                <Layout
                  allDayPanelRef={this.allDayPanelRef}
                  cellComponent={this.cellPlaceholder}
                  rowComponent={Row}
                  cellsData={allDayCells(viewCellsData)}
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

        <Template name="cell">
          {params => (
            <TemplateConnector>
              {({ currentView }) => {
                if (currentView.name === MONTH) return <TemplatePlaceholder params={params} />;
                return (
                  <Cell {...params} />
                );
              }}
            </TemplateConnector>
          )}
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
