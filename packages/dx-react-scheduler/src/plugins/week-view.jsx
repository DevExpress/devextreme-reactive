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
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getAppointmentStyle,
  getWeekRectByDates,
  timeScale as timeScaleCore,
  dayScale as dayScaleCore,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  VERTICAL_APPOINTMENT_TYPE,
} from '@devexpress/dx-scheduler-core';

const SidebarPlaceholder = props => (
  <TemplatePlaceholder name="sidebar" params={props} />
);
const NavbarPlaceholder = props => (
  <TemplatePlaceholder name="navbar" params={props} />
);
const DateTablePlaceholder = props => (
  <TemplatePlaceholder name="main" params={props} />
);
const NavbarEmptyPlaceholder = props => (
  <TemplatePlaceholder name="navbarEmpty" params={props} />
);
const AppointmentPlaceholder = props => (
  <TemplatePlaceholder name="appointment" params={props} />
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
      timePanelRowComponent: TimePanelRow,
      timePanelCellComponent: TimePanelCell,
      dayPanelLayoutComponent: DayPanel,
      dayPanelCellComponent: DayScaleCell,
      dateTableLayoutComponent: DateTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      containerComponent: Container,
      startDayHour, endDayHour,
      cellDuration, intervalCount,
      firstDayOfWeek, excludedDays,
    } = this.props;

    const timeScaleComputed = ({ currentDate }) => timeScaleCore(
      currentDate,
      firstDayOfWeek,
      startDayHour,
      endDayHour,
      cellDuration,
      excludedDays,
    );
    const dayScaleComputed = (
      { currentDate },
    ) => dayScaleCore(currentDate, firstDayOfWeek, intervalCount * 7, excludedDays);
    const startViewDateComputed = (
      { dayScale, timeScale },
    ) => startViewDateCore(dayScale, timeScale, startDayHour);
    const endViewDateComputed = ({ dayScale, timeScale }) => endViewDateCore(dayScale, timeScale);
    const { dateTableRef } = this.state;

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="currentView" value="week" />
        <Getter name="intervalCount" value={intervalCount} />
        <Getter name="excludedDays" value={excludedDays} />
        <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
        <Getter name="timeScale" computed={timeScaleComputed} />
        <Getter name="dayScale" computed={dayScaleComputed} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />

        <Template name="body">
          <ViewLayout
            navbarComponent={NavbarPlaceholder}
            navbarEmptyComponent={NavbarEmptyPlaceholder}
            mainComponent={DateTablePlaceholder}
            sidebarComponent={SidebarPlaceholder}
          />
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ dayScale }) => (
              <DayPanel
                rowComponent={TimePanelRow}
                cellComponent={DayScaleCell}
                dayScale={dayScale}
              />
            )}
          </TemplateConnector>
        </Template>

        <Template name="sidebar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ timeScale }) => (
              <TimePanel
                rowComponent={TimePanelRow}
                cellComponent={TimePanelCell}
                timeScale={timeScale}
              />
            )}
          </TemplateConnector>
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              timeScale, dayScale, appointments, startViewDate, endViewDate,
            }) => {
              const intervals = calculateWeekDateIntervals(
                appointments, startViewDate, endViewDate, excludedDays,
              );
              const rects = dateTableRef ? calculateRectByDateIntervals(
                {
                  growDirection: VERTICAL_APPOINTMENT_TYPE,
                  multiline: false,
                },
                intervals,
                getWeekRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  dayScale,
                  timeScale,
                  cellDuration,
                  cellElements: dateTableRef.querySelectorAll('td'),
                },
              ) : [];

              return (
                <React.Fragment>
                  <DateTable
                    rowComponent={DateTableRow}
                    cellComponent={DateTableCell}
                    timeScale={timeScale}
                    dayScale={dayScale}
                    dateTableRef={this.dateTableRef}
                  />
                  <Container>
                    {rects.map(({
                      dataItem, type, ...geometry
                    }, index) => (
                      <AppointmentPlaceholder
                        type={type}
                        key={index.toString()}
                        appointment={dataItem}
                        style={getAppointmentStyle(geometry)}
                      />
                    ))}
                  </Container>
                </React.Fragment>
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
  dateTableLayoutComponent: PropTypes.func.isRequired,
  dateTableRowComponent: PropTypes.func.isRequired,
  dateTableCellComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  startDayHour: PropTypes.number,
  endDayHour: PropTypes.number,
  cellDuration: PropTypes.number,
  intervalCount: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
  excludedDays: PropTypes.array,
};

WeekView.defaultProps = {
  startDayHour: 0,
  endDayHour: 24,
  cellDuration: 30,
  intervalCount: 1,
  firstDayOfWeek: 0,
  excludedDays: [],
};
