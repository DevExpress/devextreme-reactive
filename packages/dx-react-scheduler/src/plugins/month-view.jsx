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
  viewCells as viewCellsComputed,
  calculateRectByDateIntervals,
  calculateMonthDateIntervals,
  getAppointmentStyle,
  getMonthRectByDates,
  endViewBoundary,
  monthCells as monthCellsCore,
  availableViews as availableViewsCore,
  HORIZONTAL_TYPE,
} from '@devexpress/dx-scheduler-core';

const TYPE = 'month';

export class MonthView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    const {
      name: viewName, firstDayOfWeek, intervalCount,
    } = this.props;

    this.dateTableRef = this.dateTableRef.bind(this);
    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.dateTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;

    this.monthCellsBaseComputed = ({ currentDate }) => monthCellsCore(
      currentDate, firstDayOfWeek, intervalCount,
    );
    this.startViewDateBaseComputed = ({ monthCells }) => new Date(monthCells[0][0].value);
    this.endViewDateBaseComputed = ({ monthCells }) => endViewBoundary(monthCells);
    this.viewCellsBaseComputed = ({
      currentView, currentDate, dayScale, timeScale,
    }) => viewCellsComputed(
      currentView.type, currentDate, firstDayOfWeek, intervalCount, dayScale, timeScale,
    );

    this.currentViewComputed = ({ currentView }) => (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE }
    );
    this.availableViewsComputed = ({ availableViews }) => availableViewsCore(
      availableViews, viewName,
    );
    this.intervalCountComputed = getters => computed(
      getters, viewName, () => intervalCount, getters.intervalCount,
    );
    this.firstDayOfWeekComputed = getters => computed(
      getters, viewName, () => firstDayOfWeek, getters.firstDayOfWeek,
    );
    this.monthCellsComputed = getters => computed(
      getters,
      viewName,
      this.monthCellsBaseComputed,
      getters.monthCells,
    );
    this.startViewDateComputed = getters => computed(
      getters, viewName, this.startViewDateBaseComputed, getters.startViewDate,
    );
    this.endViewDateComputed = getters => computed(
      getters, viewName, this.endViewDateBaseComputed, getters.endViewDate,
    );
    this.viewCells = getters => computed(
      getters, viewName, this.viewCellsBaseComputed, getters.viewCells,
    );
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
      name: viewName,
    } = this.props;
    const { dateTableRef } = this.state;

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="availableViews" computed={this.availableViewsComputed} />
        <Getter name="currentView" computed={this.currentViewComputed} />
        <Getter name="firstDayOfWeek" computed={this.firstDayOfWeekComputed} />
        <Getter name="intervalCount" computed={this.intervalCountComputed} />
        <Getter name="monthCells" computed={this.monthCellsComputed} />
        <Getter name="viewCellsData" computed={this.viewCells} />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  navbarComponent={this.dayScalePlaceholder}
                  mainComponent={this.dateTablePlaceholder}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="navbar">
          <TemplateConnector>
            {({ currentView, viewCellsData }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <DayPanel
                  cellComponent={DayPanelCell}
                  rowComponent={DayPanelRow}
                  cellsData={viewCellsData}
                />
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="main">
          <TemplateConnector>
            {({
              monthCells, appointments, startViewDate, endViewDate, currentView, viewCellsData,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const intervals = calculateMonthDateIntervals(
                appointments, startViewDate, endViewDate,
              );
              const rects = dateTableRef ? calculateRectByDateIntervals(
                {
                  growDirection: HORIZONTAL_TYPE,
                  multiline: true,
                },
                intervals,
                getMonthRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  monthCells,
                  cellElements: dateTableRef.querySelectorAll('td'),
                },
              ) : [];

              const { appointmentPlaceholder: AppointmentPlaceholder } = this;
              return (
                <React.Fragment>
                  <DateTable
                    rowComponent={DateTableRow}
                    cellComponent={this.cellPlaceholder}
                    dateTableRef={this.dateTableRef}
                    cellsData={viewCellsData}
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

        <Template name="cell">
          {params => (
            <TemplateConnector>
              {({ currentView }) => {
                if (currentView.name !== viewName) return <TemplatePlaceholder params={params} />;
                return (
                  <DateTableCell {...params} />
                );
              }}
            </TemplateConnector>
          )}
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
  name: PropTypes.string,
};

MonthView.defaultProps = {
  intervalCount: 1,
  firstDayOfWeek: 0,
  name: 'Month',
};

MonthView.components = {
  layoutComponent: 'Layout',
  containerComponent: 'Container',
  dayPanelLayoutComponent: 'DayPanelLayout',
  dayPanelCellComponent: 'DayPanelCell',
  dayPanelRowComponent: 'DayPanelRow',
  dateTableLayoutComponent: 'DateTableLayout',
  dateTableCellComponent: 'DateTableCell',
  dateTableRowComponent: 'DateTableRow',
};
