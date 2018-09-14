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
  getDayRectByDates,
  calculateRectByDateIntervals,
  calculateDayViewDateIntervals,
  getAppointmentStyle,
  timeScale as timeScaleCore,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  VERTICAL_APPOINTMENT_TYPE,
} from '@devexpress/dx-scheduler-core';

export class DayView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);

    this.sidebarPlaceholder = () => <TemplatePlaceholder name="sidebar" />;
    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.navbarEmptyPlaceholder = () => <TemplatePlaceholder name="navbarEmpty" />;
    this.dateTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
  }

  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      navbarEmptyComponent: NavbarEmpty,
      timePanelLayoutComponent: TimePanel,
      timePanelRowComponent: TimePanelRow,
      timePanelCellComponent: TimePanelCell,
      dateTableLayoutComponent: DateTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      containerComponent: Container,
      startDayHour,
      endDayHour,
      cellDuration,
      intervalCount,
      viewName,
    } = this.props;
    const { dateTableRef: stateDateTableRef } = this.state;

    const timeScaleComputed = ({ currentDate }) => timeScaleCore(
      currentDate,
      0,
      startDayHour,
      endDayHour,
      cellDuration,
      [],
    );
    const startViewDateComputed = (
      { currentDate, timeScale },
    ) => startViewDateCore([currentDate], timeScale);
    const endViewDateComputed = (
      { currentDate, timeScale },
    ) => endViewDateCore([currentDate], timeScale);

    return (
      <Plugin
        name="DayView"
      >
        <Getter name="currentView" value="Day" />
        <Getter name="intervalCount" value={intervalCount} />
        <Getter name="cellDuration" value={cellDuration} />
        <Getter name="timeScale" computed={timeScaleComputed} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />

        <Template name="body">
          <ViewLayout
            navbarComponent={this.dayScalePlaceholder}
            mainComponent={this.dateTablePlaceholder}
            navbarEmptyComponent={this.navbarEmptyPlaceholder}
            sidebarComponent={this.sidebarPlaceholder}
          />
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
        </Template>
        <Template name="navbarEmpty">
          <NavbarEmpty />
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
          <TemplateConnector>
            {({
              timeScale, appointments, startViewDate, endViewDate, currentView, currentDate,
            }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              const intervals = calculateDayViewDateIntervals(
                appointments, startViewDate, endViewDate,
              );
              const rects = stateDateTableRef ? calculateRectByDateIntervals(
                {
                  growDirection: VERTICAL_APPOINTMENT_TYPE,
                  multiline: false,
                },
                intervals,
                getDayRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  timeScale,
                  cellDuration,
                  currentDate,
                  cellElements: stateDateTableRef.querySelectorAll('td'),
                },
              ) : [];

              const { appointmentPlaceholder: AppointmentPlaceholder } = this;
              return (
                <React.Fragment>
                  <DateTable
                    rowComponent={DateTableRow}
                    cellComponent={DateTableCell}
                    timeScale={timeScale}
                    dateTableRef={this.dateTableRef}
                  />
                  <Container>
                    {rects.map(({
                      dataItem, type, ...geometry
                    }, index) => (
                      <AppointmentPlaceholder
                        key={index.toString()}
                        type={type}
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

DayView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  navbarEmptyComponent: PropTypes.func.isRequired,
  timePanelLayoutComponent: PropTypes.func.isRequired,
  timePanelRowComponent: PropTypes.func.isRequired,
  timePanelCellComponent: PropTypes.func.isRequired,
  dateTableLayoutComponent: PropTypes.func.isRequired,
  dateTableRowComponent: PropTypes.func.isRequired,
  dateTableCellComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  startDayHour: PropTypes.number,
  endDayHour: PropTypes.number,
  cellDuration: PropTypes.number,
  intervalCount: PropTypes.number,
  viewName: PropTypes.string,
};

DayView.defaultProps = {
  viewName: 'Day',
  startDayHour: 0,
  endDayHour: 24,
  cellDuration: 30,
  intervalCount: 1,
};
