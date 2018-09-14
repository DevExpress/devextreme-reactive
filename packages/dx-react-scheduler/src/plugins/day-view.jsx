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
  getDayRectByDates,
  calculateRectByDateIntervals,
  calculateDayViewDateIntervals,
  getAppointmentStyle,
  timeScale as timeScaleCore,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViews as availableViewsCore,
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

    const {
      viewName,
      startDayHour,
      endDayHour,
      cellDuration,
      intervalCount,
    } = this.props;

    this.timeScaleBaseComputed = ({
      currentDate,
    }) => timeScaleCore(currentDate, 0, startDayHour, endDayHour, cellDuration, []);
    this.startViewDateBaseComputed = ({
      currentDate, timeScale,
    }) => startViewDateCore([currentDate], timeScale);
    this.endViewDateBaseComputed = ({
      currentDate, timeScale,
    }) => endViewDateCore([currentDate], timeScale);

    this.timeScaleComputed = getters => computed(
      getters,
      viewName,
      this.timeScaleBaseComputed,
      getters.timeScale,
    );
    this.startViewDateComputed = getters => computed(
      getters, viewName, this.startViewDateBaseComputed, getters.startViewDate,
    );
    this.endViewDateComputed = getters => computed(
      getters, viewName, this.endViewDateBaseComputed, getters.endViewDate,
    );
    this.availableViewsComputed = ({ availableViews }) => availableViewsCore(
      availableViews, viewName,
    );
    this.currentViewComputed = ({ currentView }) => {
      if (!currentView || viewName === currentView) {
        return viewName;
      }
      return currentView;
    };
    this.intervalCountComputed = getters => computed(
      getters, viewName, () => intervalCount, getters.intervalCount,
    );
    this.cellDurationComputed = getters => computed(
      getters, viewName, () => cellDuration, getters.cellDuration,
    );
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
      cellDuration,
      viewName,
    } = this.props;
    const { dateTableRef: stateDateTableRef } = this.state;

    return (
      <Plugin
        name="DayView"
      >
        <Getter name="availableViews" computed={this.availableViewsComputed} />
        <Getter name="currentView" computed={this.currentViewComputed} />
        <Getter name="intervalCount" computed={this.intervalCountComputed} />
        <Getter name="cellDuration" computed={this.cellDurationComputed} />
        <Getter name="timeScale" computed={this.timeScaleComputed} />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  navbarComponent={this.dayScalePlaceholder}
                  navbarEmptyComponent={this.navbarEmptyPlaceholder}
                  mainComponent={this.dateTablePlaceholder}
                  sidebarComponent={this.sidebarPlaceholder}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="navbar">
          <TemplatePlaceholder />
        </Template>

        <Template name="navbarEmpty">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <NavbarEmpty />
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
