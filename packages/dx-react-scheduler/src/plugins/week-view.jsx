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
  viewCellsData as viewCellsDataCore,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getAppointmentStyle,
  getVerticalRectByDates,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
  VERTICAL_TYPE,
} from '@devexpress/dx-scheduler-core';

const DAYS_IN_WEEK = 7;
const TYPE = 'week';
const endViewDateBaseComputed = ({
  viewCellsData,
}) => endViewDateCore(viewCellsData);
const startViewDateBaseComputed = ({
  viewCellsData,
}) => startViewDateCore(viewCellsData);

export class WeekView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timeTableRef: { current: null },
    };

    this.timeTable = { current: null };
    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
    this.timeTableRef = this.timeTableRef.bind(this);

    this.sidebarPlaceholder = () => <TemplatePlaceholder name="sidebar" />;
    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.timeTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.dayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;

    const {
      name: viewName,
      firstDayOfWeek,
      startDayHour,
      endDayHour,
      cellDuration,
      excludedDays,
      intervalCount,
    } = props;

    const viewCellsDataComputed = ({
      currentDate,
    }) => viewCellsDataCore(
      currentDate, firstDayOfWeek,
      intervalCount * DAYS_IN_WEEK, excludedDays,
      startDayHour, endDayHour, cellDuration,
      Date.now(),
    );

    const timeTableElementComputed = () => this.timeTable;
    const layoutElementComputed = () => this.layout;
    const layoutHeaderElementComputed = () => this.layoutHeader;

    this.currentViewComputed = ({ currentView }) => (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE }
    );
    this.availableViewNamesComputed = ({ availableViewNames }) => availableViewNamesCore(
      availableViewNames, viewName,
    );
    this.intervalCountComputed = getters => computed(
      getters, viewName, () => intervalCount, getters.intervalCount,
    );
    this.firstDayOfWeekComputed = getters => computed(
      getters, viewName, () => firstDayOfWeek, getters.firstDayOfWeek,
    );
    this.excludedDaysComputed = getters => computed(
      getters, viewName, () => excludedDays, getters.excludedDays,
    );
    this.startViewDateComputed = getters => computed(
      getters, viewName, startViewDateBaseComputed, getters.startViewDate,
    );
    this.endViewDateComputed = getters => computed(
      getters, viewName, endViewDateBaseComputed, getters.endViewDate,
    );
    this.viewCellsData = getters => computed(
      getters, viewName, viewCellsDataComputed, getters.viewCellsData,
    );

    this.timeTableElement = getters => computed(
      getters, viewName, timeTableElementComputed, getters.timeTableElement,
    );
    this.layoutElement = getters => computed(
      getters, viewName, layoutElementComputed, getters.layoutElement,
    );
    this.layoutHeaderElement = getters => computed(
      getters, viewName, layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  }

  timeTableRef(nextTimeTableRef) {
    const { timeTableRef } = this.state;
    console.log(timeTableRef);
    this.timeTable = { current: timeTableRef };

    const a = timeTableRef.current && timeTableRef.current.querySelectorAll('td');
    const b = nextTimeTableRef && nextTimeTableRef.current.querySelectorAll('td');

    if (a !== b) {
      this.setState({ timeTableRef: { current: nextTimeTableRef } });
    }
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      timeScaleLayoutComponent: TimeScale,
      timeScaleRowComponent: TimeScaleRow,
      timeScaleCellComponent: TimeScaleCell,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTable,
      timeTableRowComponent: TimeTableRow,
      timeTableCellComponent: TimeTableCell,
      cellDuration,
      excludedDays,
      name: viewName,
      appointmentLayerComponent: AppointmentLayer,
      firstDayOfWeek,
      startDayHour,
      endDayHour,
      intervalCount,
    } = this.props;
    const { timeTableRef } = this.state;

    const viewCellsDataComputed = ({
      currentDate,
    }) => viewCellsDataCore(
      currentDate, firstDayOfWeek,
      intervalCount * DAYS_IN_WEEK, excludedDays,
      startDayHour, endDayHour, cellDuration,
      Date.now(),
    );


    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="availableViewNames" computed={this.availableViewNamesComputed} />
        <Getter name="currentView" computed={this.currentViewComputed} />
        <Getter name="intervalCount" value={intervalCount} />
        <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
        <Getter name="excludedDays" value={excludedDays} />
        <Getter name="viewCellsData" computed={viewCellsDataComputed} />
        <Getter name="startViewDate" computed={startViewDateBaseComputed} />
        <Getter name="endViewDate" computed={endViewDateBaseComputed} />
        <Getter name="timeTableElement" value={this.timeTable} />
        <Getter name="layoutElement" value={this.layout} />
        <Getter name="layoutHeaderElement" value={this.layoutHeader} />

        <Getter name="table123" value={timeTableRef} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  dayScaleComponent={this.dayScalePlaceholder}
                  dayScaleEmptyCellComponent={this.dayScaleEmptyCellPlaceholder}
                  timeTableComponent={this.timeTablePlaceholder}
                  timeScaleComponent={this.sidebarPlaceholder}
                  layoutRef={this.layout}
                  layoutHeaderRef={this.layoutHeader}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="navbar">
          <TemplateConnector>
            {({ currentView, viewCellsData, formatDate }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <DayScale
                  cellComponent={DayScaleCell}
                  rowComponent={DayScaleRow}
                  cellsData={viewCellsData}
                  formatDate={formatDate}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="dayScaleEmptyCell">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <DayScaleEmptyCell />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="sidebar">
          <TemplateConnector>
            {({ currentView, viewCellsData, formatDate }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <TimeScale
                  rowComponent={TimeScaleRow}
                  cellComponent={TimeScaleCell}
                  cellsData={viewCellsData}
                  formatDate={formatDate}
                />
              );
            }}
          </TemplateConnector>
        </Template>



        <Template name="main">
          <TemplateConnector>
            {({
              appointments, startViewDate, timeTableElement,
              endViewDate, currentView, viewCellsData, table123,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const intervals = calculateWeekDateIntervals(
                appointments, startViewDate, endViewDate, excludedDays,
              );
              debugger
              const timeTable123 = table123.current;
              const timeTableCells = timeTable123 ? timeTable123.querySelectorAll('td') : [];
              const isCurrentTimeTable = timeTableCells.length === viewCellsData.length * viewCellsData[0].length;
              const rects = isCurrentTimeTable ? calculateRectByDateIntervals(
                {
                  growDirection: VERTICAL_TYPE,
                  multiline: false,
                },
                intervals,
                getVerticalRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  viewCellsData,
                  cellDuration,
                  cellElements: timeTable123.querySelectorAll('td'),
                },
              ) : [];

              const { appointmentPlaceholder: AppointmentPlaceholder } = this;
              return (
                <React.Fragment>

                  <AppointmentLayer>
                    {rects.map(({
                      dataItem, type, fromPrev, toNext, ...geometry
                    }, index) => (
                      <AppointmentPlaceholder
                        key={index.toString()}
                        type={type}
                        data={dataItem}
                        fromPrev={fromPrev}
                        toNext={toNext}
                        style={getAppointmentStyle(geometry)}
                      />
                    ))}
                  </AppointmentLayer>
                </React.Fragment>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="main">
          <TemplateConnector>
            {({ viewCellsData, formatDate }) => {
              debugger
              return (
                <React.Fragment>
                  <TimeTable
                    rowComponent={TimeTableRow}
                    cellComponent={TimeTableCell}
                    tableRef={this.timeTableRef}
                    cellsData={viewCellsData}
                    formatDate={formatDate}
                  />
                  <TemplatePlaceholder />
                </React.Fragment>
              )
            }
            }
          </TemplateConnector>
        </Template>

        <Template name="cell">
          {params => (
            <TemplateConnector>
              {({ currentView }) => {
                if (currentView.name !== viewName) return <TemplatePlaceholder params={params} />;
                return (
                  <TimeTableCell {...params} />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

WeekView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  dayScaleEmptyCellComponent: PropTypes.func.isRequired,
  timeScaleLayoutComponent: PropTypes.func.isRequired,
  timeScaleRowComponent: PropTypes.func.isRequired,
  timeScaleCellComponent: PropTypes.func.isRequired,
  dayScaleLayoutComponent: PropTypes.func.isRequired,
  dayScaleCellComponent: PropTypes.func.isRequired,
  dayScaleRowComponent: PropTypes.func.isRequired,
  timeTableLayoutComponent: PropTypes.func.isRequired,
  timeTableRowComponent: PropTypes.func.isRequired,
  timeTableCellComponent: PropTypes.func.isRequired,
  appointmentLayerComponent: PropTypes.func.isRequired,
  startDayHour: PropTypes.number,
  endDayHour: PropTypes.number,
  cellDuration: PropTypes.number,
  intervalCount: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
  excludedDays: PropTypes.array,
  name: PropTypes.string,
};

WeekView.defaultProps = {
  startDayHour: 0,
  endDayHour: 24,
  cellDuration: 30,
  intervalCount: 1,
  firstDayOfWeek: 0,
  excludedDays: [],
  name: 'Week',
};

WeekView.components = {
  layoutComponent: 'Layout',
  appointmentLayerComponent: 'AppointmentLayer',
  dayScaleEmptyCellComponent: 'DayScaleEmptyCell',
  timeScaleLayoutComponent: 'TimeScaleLayout',
  timeScaleCellComponent: 'TimeScaleCell',
  timeScaleRowComponent: 'TimeScaleRow',
  dayScaleLayoutComponent: 'DayScaleLayout',
  dayScaleCellComponent: 'DayScaleCell',
  dayScaleRowComponent: 'DayScaleRow',
  timeTableLayoutComponent: 'TimeTableLayout',
  timeTableCellComponent: 'TimeTableCell',
  timeTableRowComponent: 'TimeTableRow',
};
