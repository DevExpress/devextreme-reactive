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
  calculateRectByDateIntervals,
  calculateMonthDateIntervals,
  getAppointmentStyle,
  getMonthRectByDates,
  endViewBoundary,
  dayScale as dayScaleCore,
  monthCells as monthCellsCore,
  availableViews as availableViewsCore,
  HORIZONTAL_APPOINTMENT_TYPE,
} from '@devexpress/dx-scheduler-core';

const WEEK_COUNT = 7;

const dayScaleBaseComputed = ({ currentDate, firstDayOfWeek }) => dayScaleCore(
  currentDate, firstDayOfWeek, WEEK_COUNT, [],
);
const monthCellsBaseComputed = ({ currentDate, firstDayOfWeek, intervalCount }) => monthCellsCore(
  currentDate, firstDayOfWeek, intervalCount,
);
const startViewDateBaseComputed = ({ monthCells }) => new Date(monthCells[0][0].value);
const endViewDateBaseComputed = ({ monthCells }) => endViewBoundary(monthCells);

export class MonthView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);
    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.dateTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
    this.navbarEmptyPlaceholder = () => <TemplatePlaceholder name="navbarEmpty" />;
  }

  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      dayPanelLayoutComponent: DayPanel,
      dayPanelCellComponent: DayPanelCell,
      dayPanelRowComponent: DayPanelRow,
      dateTableLayoutComponent: DateTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      containerComponent: Container,
      intervalCount,
      firstDayOfWeek,
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
    const intervalCountComputed = getters => computed(
      getters, viewName, () => intervalCount, getters.excludedDaysComputed,
    );
    const firstDayOfWeekComputed = getters => computed(
      getters, viewName, () => firstDayOfWeek, getters.firstDayOfWeek,
    );
    const dayScaleComputed = getters => computed(
      { ...getters, firstDayOfWeek }, viewName, dayScaleBaseComputed, getters.dayScale,
    );
    const monthCellsComputed = getters => computed(
      { ...getters, firstDayOfWeek, intervalCount },
      viewName,
      monthCellsBaseComputed,
      getters.monthCells,
    );
    const startViewDateComputed = getters => computed(
      getters, viewName, startViewDateBaseComputed, getters.startViewDate,
    );
    const endViewDateComputed = getters => computed(
      getters, viewName, endViewDateBaseComputed, getters.endViewDate,
    );

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="availableViews" computed={availableViewsComputed} />
        <Getter name="currentView" computed={currentViewComputed} />
        <Getter name="firstDayOfWeek" computed={firstDayOfWeekComputed} />
        <Getter name="intervalCount" computed={intervalCountComputed} />
        <Getter name="dayScale" computed={dayScaleComputed} />
        <Getter name="monthCells" computed={monthCellsComputed} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  navbarComponent={this.dayScalePlaceholder}
                  navbarEmptyComponent={this.navbarEmptyPlaceholder}
                  mainComponent={this.dateTablePlaceholder}
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
        <Template name="main">
          <TemplateConnector>
            {({
              monthCells, appointments, startViewDate, endViewDate, currentView,
            }) => {
              if (currentView !== viewName) return <TemplatePlaceholder />;
              const intervals = calculateMonthDateIntervals(
                appointments, startViewDate, endViewDate,
              );
              const rects = stateDateTableRef ? calculateRectByDateIntervals(
                {
                  growDirection: HORIZONTAL_APPOINTMENT_TYPE,
                  multiline: true,
                },
                intervals,
                getMonthRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  monthCells,
                  cellElements: stateDateTableRef.querySelectorAll('td'),
                },
              ) : [];

              const { appointmentPlaceholder: AppointmentPlaceholder } = this;
              return (
                <React.Fragment>
                  <DateTable
                    rowComponent={DateTableRow}
                    cellComponent={DateTableCell}
                    monthCells={monthCells}
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

MonthView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  dayPanelLayoutComponent: PropTypes.func.isRequired,
  dayPanelCellComponent: PropTypes.func.isRequired,
  dayPanelRowComponent: PropTypes.func.isRequired,
  dateTableLayoutComponent: PropTypes.func.isRequired,
  dateTableRowComponent: PropTypes.func.isRequired,
  dateTableCellComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  intervalCount: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
  viewName: PropTypes.string,
};

MonthView.defaultProps = {
  intervalCount: 1,
  firstDayOfWeek: 0,
  viewName: 'Month',
};
