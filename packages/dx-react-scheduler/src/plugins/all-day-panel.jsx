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
  getHorizontalRectByDates,
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
    this.cellPlaceholder = params => <TemplatePlaceholder name="allDayPanelCell" params={params} />;
    this.allDayPanelPlaceholder = params => <TemplatePlaceholder name="allDayPanel" params={params} />;
  }

  allDayPanelRef(ref) {
    this.setState({
      tableRef: ref,
    });
  }

  render() {
    const {
      appointmentLayerComponent: AppointmentLayer,
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
      titleCellComponent: TitleCell,
      messages,
    } = this.props;
    const { tableRef } = this.state;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    const { allDayPanelPlaceholder: AllDayPanelPlaceholder } = this;

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        <Template name="dayScaleEmptyCell">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView === MONTH) return null;
              return (
                <TitleCell getMessage={getMessage} />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView === MONTH) return null;
              return (
                <div style={{ position: 'relative' }}>
                  <AllDayPanelPlaceholder />
                </div>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="allDayPanel">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              currentView, appointments, startViewDate,
              endViewDate, excludedDays, viewCellsData,
            }) => {
              if (currentView.name === MONTH) return null;
              const intervals = calculateAllDayDateIntervals(
                appointments, startViewDate, endViewDate, excludedDays,
              );
              const rects = tableRef && tableRef.querySelectorAll('th').length === viewCellsData[0].length ? calculateRectByDateIntervals(
                {
                  growDirection: HORIZONTAL_TYPE,
                  multiline: false,
                },
                intervals,
                getHorizontalRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  excludedDays,
                  viewCellsData,
                  cellElements: tableRef.querySelectorAll('th'),
                },
              ) : [];
              const { appointmentPlaceholder: AppointmentPlaceholder } = this;
              return (
                <React.Fragment>
                  <Layout
                    allDayPanelRef={this.allDayPanelRef}
                    cellComponent={this.cellPlaceholder}
                    rowComponent={Row}
                    cellsData={allDayCells(viewCellsData)}
                  />
                  <AppointmentLayer>
                    {rects.map(({ dataItem, type, ...geometry }, index) => (
                      <AppointmentPlaceholder
                        style={getAppointmentStyle(geometry)}
                        type={type}
                        key={index.toString()}
                        data={dataItem}
                      />
                    ))}
                  </AppointmentLayer>
                </React.Fragment>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="allDayPanelCell">
          {params => <Cell {...params} />}
        </Template>
      </Plugin>
    );
  }
}

AllDayPanel.propTypes = {
  appointmentLayerComponent: PropTypes.func.isRequired,
  layoutComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  titleCellComponent: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    allDay: PropTypes.string,
  }),
};

AllDayPanel.defaultProps = {
  messages: {},
};

AllDayPanel.components = {
  appointmentLayerComponent: 'AppointmentLayer',
  layoutComponent: 'Layout',
  cellComponent: 'Cell',
  rowComponent: 'Row',
  titleCellComponent: 'TitleCell',
};
