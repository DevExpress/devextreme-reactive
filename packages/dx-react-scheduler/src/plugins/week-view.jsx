import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  appointmentRects,
  timeScale as timeScaleCore,
  dayScale as dayScaleCore,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
} from '@devexpress/dx-scheduler-core';

const appointmentRectsComputed = ({
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  dayScale,
  timeScale,
  cellDuration,
  dateTableRef,
}) => (dateTableRef ? appointmentRects(
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  dayScale,
  timeScale,
  cellDuration,
  dateTableRef.querySelectorAll('td'),
) : []);

const SidebarPlaceholder = props => (
  <TemplatePlaceholder name="sidebar" params={props} />
);
const DayScalePlaceholder = props => (
  <TemplatePlaceholder name="navbar" params={props} />
);
const DateTablePlaceholder = props => (
  <TemplatePlaceholder name="main" params={props} />
);

export class WeekView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);
  }
  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }
  render() {
    const {
      layoutComponent: ViewLayout,
      timePanelLayoutComponent: TimePanel,
      timePanelTableComponent: TimePanelTable,
      timePanelRowComponent: TimePanelRow,
      timePanelCellComponent: TimePanelCell,
      dayPanelLayoutComponent: DayPanel,
      dayPanelTableComponent: DayScaleTable,
      dayPanelCellComponent: DayScaleCell,
      dateTableLayoutComponent: DateTable,
      dateTableTableComponent: DateTableTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      startDayHour,
      endDayHour,
      cellDuration,
      intervalCount,
      firstDayOfWeek,
      excludedDays,
      viewName,
    } = this.props;

    const currentViewComputed = ({ currentView }) => {
      debugger
      if (!currentView || viewName === currentView) {
        return viewName;
      }
      return currentView;
    };
    const timeScaleComputed = ({ currentDate }) =>
      timeScaleCore(
        currentDate,
        firstDayOfWeek,
        startDayHour,
        endDayHour,
        cellDuration,
        excludedDays,
      );
    const dayScaleComputed = ({ currentDate }) =>
      dayScaleCore(currentDate, firstDayOfWeek, intervalCount * 7, excludedDays);
    const startViewDateComputed = ({ dayScale, timeScale }) =>
      startViewDateCore(dayScale, timeScale, startDayHour);
    const endViewDateComputed = ({ dayScale, timeScale }) => endViewDateCore(dayScale, timeScale);
    const dateTableRefComputed = ({ currentView, dateTableRef }) => {
      if (currentView === viewName && this.state.dateTableRef) {
        return this.state.dateTableRef;
      } return dateTableRef;
    };

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="currentView" computed={currentViewComputed} />
        <Getter name="dateTableRef" computed={dateTableRefComputed} />
        <TemplateConnector>
          {({ currentView }) => {
            if (currentView !== viewName) return null;
              return (
                <React.Fragment>

                  <Getter name="cellDuration" value={cellDuration} />
                  <Getter name="excludedDays" value={excludedDays} />
                  <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
                  <Getter name="timeScale" computed={timeScaleComputed} />
                  <Getter name="dayScale" computed={dayScaleComputed} />
                  <Getter name="startViewDate" computed={startViewDateComputed} />
                  <Getter name="endViewDate" computed={endViewDateComputed} />

                  <Getter name="appointmentRects" computed={appointmentRectsComputed} />

                  <Template name="body">
                    <ViewLayout
                      navbarComponent={DayScalePlaceholder}
                      mainComponent={DateTablePlaceholder}
                      sidebarComponent={SidebarPlaceholder}
                    />
                  </Template>

                  <Template name="navbar">
                    <TemplateConnector>
                      {({ dayScale }) => (
                        <DayPanel
                          rowComponent={TimePanelRow}
                          cellComponent={DayScaleCell}
                          tableComponent={DayScaleTable}
                          dayScale={dayScale}
                        />
                      )}
                    </TemplateConnector>
                  </Template>

                  <Template name="sidebar">
                    <TemplateConnector>
                      {({ timeScale }) => (
                        <TimePanel
                          rowComponent={TimePanelRow}
                          cellComponent={TimePanelCell}
                          tableComponent={TimePanelTable}
                          timeScale={timeScale}
                        />
                      )}
                    </TemplateConnector>
                  </Template>

                  <Template name="main">
                    <TemplateConnector>
                      {({ timeScale, dayScale }) => (
                        <DateTable
                          rowComponent={DateTableRow}
                          cellComponent={DateTableCell}
                          tableComponent={DateTableTable}
                          timeScale={timeScale}
                          dayScale={dayScale}
                          dateTableRef={this.dateTableRef}
                        />
                      )}
                    </TemplateConnector>
                  </Template>
                </React.Fragment>
              );
            }}
        </TemplateConnector>
      </Plugin>
    );
  }
}

WeekView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  timePanelLayoutComponent: PropTypes.func.isRequired,
  timePanelTableComponent: PropTypes.func.isRequired,
  timePanelRowComponent: PropTypes.func.isRequired,
  timePanelCellComponent: PropTypes.func.isRequired,
  dayPanelLayoutComponent: PropTypes.func.isRequired,
  dayPanelTableComponent: PropTypes.func.isRequired,
  dayPanelCellComponent: PropTypes.func.isRequired,
  dateTableLayoutComponent: PropTypes.func.isRequired,
  dateTableTableComponent: PropTypes.func.isRequired,
  dateTableRowComponent: PropTypes.func.isRequired,
  dateTableCellComponent: PropTypes.func.isRequired,
  startDayHour: PropTypes.number,
  endDayHour: PropTypes.number,
  cellDuration: PropTypes.number,
  intervalCount: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
  excludedDays: PropTypes.array,
  viewName: PropTypes.string,
};

WeekView.defaultProps = {
  startDayHour: 0,
  endDayHour: 24,
  cellDuration: 30,
  intervalCount: 1,
  firstDayOfWeek: 0,
  excludedDays: [],
  viewName: 'Week',
};
