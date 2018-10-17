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
  getVerticalRectByDates,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getAppointmentStyle,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViews as availableViewsCore,
  VERTICAL_TYPE,
} from '@devexpress/dx-scheduler-core';

const TYPE = 'day';

export class DayView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dateTableRef: null,
    };

    this.dateTableRef = this.dateTableRef.bind(this);

    this.sidebarPlaceholder = () => <TemplatePlaceholder name="sidebar" />;
    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.dayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
    this.dateTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;

    const {
      name: viewName,
      startDayHour,
      endDayHour,
      cellDuration,
      intervalCount,
    } = this.props;

    this.startViewDateBaseComputed = ({
      viewCellsData,
    }) => startViewDateCore(viewCellsData);
    this.endViewDateBaseComputed = ({
      viewCellsData,
    }) => endViewDateCore(viewCellsData);
    this.viewCellsDataBaseComputed = ({
      currentView, currentDate,
    }) => viewCellsDataCore(
      currentView.type, currentDate, undefined,
      intervalCount, intervalCount, [],
      startDayHour, endDayHour, cellDuration,
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
    this.currentViewComputed = ({ currentView }) => (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE }
    );
    this.intervalCountComputed = getters => computed(
      getters, viewName, () => intervalCount, getters.intervalCount,
    );
    this.cellDurationComputed = getters => computed(
      getters, viewName, () => cellDuration, getters.cellDuration,
    );
    this.viewCellsData = getters => computed(
      getters, viewName, this.viewCellsDataBaseComputed, getters.viewCellsData,
    );
  }

  dateTableRef(dateTableRef) {
    this.setState({ dateTableRef });
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      timePanelLayoutComponent: TimePanel,
      timePanelRowComponent: TimePanelRow,
      timePanelCellComponent: TimePanelCell,
      dayPanelLayoutComponent: DayPanel,
      dayPanelCellComponent: DayPanelCell,
      dayPanelRowComponent: DayPanelRow,
      dateTableLayoutComponent: DateTable,
      dateTableRowComponent: DateTableRow,
      dateTableCellComponent: DateTableCell,
      containerComponent: Container,
      cellDuration,
      name: viewName,
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
        <Getter name="viewCellsData" computed={this.viewCellsData} />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  navbarComponent={this.dayScalePlaceholder}
                  dayScaleEmptyCellComponent={this.dayScaleEmptyCellPlaceholder}
                  mainComponent={this.dateTablePlaceholder}
                  sidebarComponent={this.sidebarPlaceholder}
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
            {({ currentView, viewCellsData }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <TimePanel
                  rowComponent={TimePanelRow}
                  cellComponent={TimePanelCell}
                  cellsData={viewCellsData}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="main">
          <TemplateConnector>
            {({
              appointments, startViewDate,
              endViewDate, currentView, currentDate,
              viewCellsData,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const intervals = calculateWeekDateIntervals(
                appointments, startViewDate, endViewDate, [],
              );
              const rects = stateDateTableRef ? calculateRectByDateIntervals(
                {
                  growDirection: VERTICAL_TYPE,
                  multiline: false,
                },
                intervals,
                getVerticalRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  cellDuration,
                  currentDate,
                  viewCellsData,
                  cellElements: stateDateTableRef.querySelectorAll('td'),
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
                        data={dataItem}
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

DayView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  dayScaleEmptyCellComponent: PropTypes.func.isRequired,
  timePanelLayoutComponent: PropTypes.func.isRequired,
  timePanelRowComponent: PropTypes.func.isRequired,
  timePanelCellComponent: PropTypes.func.isRequired,
  dayPanelLayoutComponent: PropTypes.func.isRequired,
  dayPanelCellComponent: PropTypes.func.isRequired,
  dayPanelRowComponent: PropTypes.func.isRequired,
  dateTableLayoutComponent: PropTypes.func.isRequired,
  dateTableRowComponent: PropTypes.func.isRequired,
  dateTableCellComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  startDayHour: PropTypes.number,
  endDayHour: PropTypes.number,
  cellDuration: PropTypes.number,
  intervalCount: PropTypes.number,
  name: PropTypes.string,
};

DayView.defaultProps = {
  name: 'Day',
  startDayHour: 0,
  endDayHour: 24,
  cellDuration: 30,
  intervalCount: 1,
};

DayView.components = {
  layoutComponent: 'Layout',
  containerComponent: 'Container',
  dayScaleEmptyCellComponent: 'DayScaleEmptyCell',
  timePanelLayoutComponent: 'TimePanelLayout',
  timePanelCellComponent: 'TimePanelCell',
  timePanelRowComponent: 'TimePanelRow',
  dayPanelLayoutComponent: 'DayPanelLayout',
  dayPanelCellComponent: 'DayPanelCell',
  dayPanelRowComponent: 'DayPanelRow',
  dateTableLayoutComponent: 'DateTableLayout',
  dateTableCellComponent: 'DateTableCell',
  dateTableRowComponent: 'DateTableRow',
};
