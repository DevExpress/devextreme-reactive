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
  computed,
  appointmentRects as weekAppointmentRects,
  timeScale as timeScaleCore,
  dayScale as dayScaleCore,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViews as availableViewsCore,
} from '@devexpress/dx-scheduler-core';

const DAYS_IN_WEEK = 7;

const endViewDateBaseComputed = ({
  dayScale, timeScale,
}) => endViewDateCore(dayScale, timeScale);
const timeScaleBaseComputed = ({
  currentDate,
  firstDayOfWeek,
  startDayHour,
  endDayHour,
  cellDuration,
  excludedDays,
}) => timeScaleCore(
  currentDate,
  firstDayOfWeek,
  startDayHour,
  endDayHour,
  cellDuration,
  excludedDays,
);
const dayScaleBaseComputed = ({
  currentDate, firstDayOfWeek, intervalCount, excludedDays,
}) => dayScaleCore(currentDate, firstDayOfWeek, intervalCount * DAYS_IN_WEEK, excludedDays);
const startViewDateBaseComputed = ({
  dayScale, timeScale, startDayHour,
}) => startViewDateCore(dayScale, timeScale, startDayHour);
const appointmentRectsBaseComputed = ({
  appointments,
  startViewDate,
  endViewDate,
  dayScale,
  timeScale,
  stateDateTableRef,
  excludedDays,
  cellDuration,
}) => {
  console.log('rects');
  return (stateDateTableRef ? weekAppointmentRects(
    appointments,
    startViewDate,
    endViewDate,
    excludedDays,
    dayScale,
    timeScale,
    cellDuration,
    stateDateTableRef.querySelectorAll('td'),
  ) : []);
};

export class WeekView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);

    this.sidebarPlaceholder = () => <TemplatePlaceholder name="sidebar" />;
    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.dateTablePlaceholder = () => <TemplatePlaceholder name="main" />;
  }

  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      timePanelLayoutComponent: TimePanel,
      timePanelRowComponent: TimePanelRow,
      timePanelCellComponent: TimePanelCell,
      dayPanelLayoutComponent: DayPanel,
      dayPanelCellComponent: DayPanelCell,
      dayPanelRowComponent: DayPanelRow,
      dateTableLayoutComponent: DateTable,
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
    const { dateTableRef: stateDateTableRef } = this.state;

    const currentViewComputed = ({ currentView }) => {
      if (!currentView || viewName === currentView) {
        return viewName;
      }
      return currentView;
    };
    const availableViewsComputed = ({ availableViews }) => availableViewsCore(
      availableViews, viewName,
    );
    const intervalCountComputed = getters => computed(getters, viewName, () => intervalCount, getters.intervalCount);
    const firstDayOfWeekComputed = getters => computed(getters, viewName, () => firstDayOfWeek, getters.firstDayOfWeek);
    const timeScaleComputed = getters => computed({ ...getters, startDayHour, endDayHour, cellDuration, excludedDays }, viewName, timeScaleBaseComputed, getters.timeScale);
    const dayScaleComputed = getters => computed({ ...getters, intervalCount, excludedDays }, viewName, dayScaleBaseComputed, getters.dayScale);
    const startViewDateComputed = getters => computed({ ...getters, startDayHour }, viewName, startViewDateBaseComputed, getters.startViewDate);
    const endViewDateComputed = getters => computed(getters, viewName, endViewDateBaseComputed, getters.endViewDate);
    const appointmentRectsComputed = getters => computed({ ...getters, stateDateTableRef, cellDuration, excludedDays }, viewName, appointmentRectsBaseComputed, getters.appointmentRects);

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="availableViews" computed={availableViewsComputed} />
        <Getter name="currentView" computed={currentViewComputed} />
        <Getter name="intervalCount" computed={intervalCountComputed} />
        <Getter name="firstDayOfWeek" computed={firstDayOfWeekComputed} />
        <Getter name="timeScale" computed={timeScaleComputed} />
        <Getter name="dayScale" computed={dayScaleComputed} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />
        <Getter name="appointmentRects" computed={appointmentRectsComputed} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  navbarComponent={this.dayScalePlaceholder}
                  mainComponent={this.dateTablePlaceholder}
                  sidebarComponent={this.sidebarPlaceholder}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="navbar">
          <TemplateConnector>
            {({ dayScale, currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <DayPanel
                  cellComponent={DayPanelCell}
                  rowComponent={DayPanelRow}
                  dayScale={dayScale}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="sidebar">
          <TemplateConnector>
            {({ timeScale, currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <TimePanel
                  rowComponent={TimePanelRow}
                  cellComponent={TimePanelCell}
                  timeScale={timeScale}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="main">
          <TemplateConnector>
            {({ timeScale, dayScale, currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <DateTable
                  rowComponent={DateTableRow}
                  cellComponent={DateTableCell}
                  timeScale={timeScale}
                  dayScale={dayScale}
                  dateTableRef={this.dateTableRef}
                />
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

WeekView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  timePanelLayoutComponent: PropTypes.func.isRequired,
  timePanelRowComponent: PropTypes.func.isRequired,
  timePanelCellComponent: PropTypes.func.isRequired,
  dayPanelLayoutComponent: PropTypes.func.isRequired,
  dayPanelCellComponent: PropTypes.func.isRequired,
  dayPanelRowComponent: PropTypes.func.isRequired,
  dateTableLayoutComponent: PropTypes.func.isRequired,
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
