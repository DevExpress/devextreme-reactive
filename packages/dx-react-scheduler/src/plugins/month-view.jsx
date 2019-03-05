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
  startViewDate as startViewDateCore,
  monthCellsData,
  calculateRectByDateIntervals,
  calculateMonthDateIntervals,
  getAppointmentStyle,
  getHorizontalRectByDates,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
  HORIZONTAL_TYPE,
} from '@devexpress/dx-scheduler-core';

const TYPE = 'month';

export class MonthView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timeTableRef: null,
    };

    const {
      name: viewName, firstDayOfWeek, intervalCount,
    } = props;

    this.timeTable = { current: null };
    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
    this.timeTableRef = this.timeTableRef.bind(this);

    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.timeTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;

    this.startViewDateBaseComputed = ({ viewCellsData }) => startViewDateCore(viewCellsData);
    this.endViewDateBaseComputed = ({ viewCellsData }) => endViewDateCore(viewCellsData);
    this.viewCellsDataComputed = ({
      currentDate,
    }) => monthCellsData(
      currentDate, firstDayOfWeek,
      intervalCount, Date.now(),
    );

    this.timeTableElementComputed = () => this.timeTable;
    this.layoutElementComputed = () => this.layout;
    this.layoutHeaderElementComputed = () => this.layoutHeader;

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
    this.startViewDateCore = getters => computed(
      getters, viewName, this.startViewDateBaseComputed, getters.startViewDate,
    );
    this.endViewDateComputed = getters => computed(
      getters, viewName, this.endViewDateBaseComputed, getters.endViewDate,
    );
    this.viewCellsData = getters => computed(
      getters, viewName, this.viewCellsDataComputed, getters.viewCellsData,
    );

    this.timeTableElement = getters => computed(
      getters, viewName, this.timeTableElementComputed, getters.timeTableElement,
    );
    this.layoutElement = getters => computed(
      getters, viewName, this.layoutElementComputed, getters.layoutElement,
    );
    this.layoutHeaderElement = getters => computed(
      getters, viewName, this.layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  }

  timeTableRef(timeTableRef) {
    this.timeTable.current = timeTableRef;
    this.setState({ timeTableRef });
  }

  render() {
    const {
      layoutComponent: ViewLayout,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTable,
      timeTableRowComponent: TimeTableRow,
      timeTableCellComponent: TimeTableCell,
      appointmentLayerComponent: AppointmentLayer,
      name: viewName,
    } = this.props;
    const { timeTableRef } = this.state;

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="availableViewNames" computed={this.availableViewNamesComputed} />
        <Getter name="currentView" computed={this.currentViewComputed} />
        <Getter name="firstDayOfWeek" computed={this.firstDayOfWeekComputed} />
        <Getter name="intervalCount" computed={this.intervalCountComputed} />
        <Getter name="viewCellsData" computed={this.viewCellsData} />
        <Getter name="startViewDate" computed={this.startViewDateCore} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Getter name="timeTableElement" computed={this.timeTableElement} />
        <Getter name="layoutElement" computed={this.layoutElement} />
        <Getter name="layoutHeaderElement" computed={this.layoutHeaderElement} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  dayScaleComponent={this.dayScalePlaceholder}
                  timeTableComponent={this.timeTablePlaceholder}

                  layoutRef={this.layout}
                  layoutHeaderRef={this.layoutHeader}
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
                <DayScale
                  cellComponent={DayScaleCell}
                  rowComponent={DayScaleRow}
                  cellsData={viewCellsData}
                />
              );
            }}
          </TemplateConnector>
        </Template>
        <Template name="main">
          <TemplateConnector>
            {({
              appointments, startViewDate, endViewDate, currentView, viewCellsData,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const intervals = calculateMonthDateIntervals(
                appointments, startViewDate, endViewDate,
              );
              const rects = timeTableRef ? calculateRectByDateIntervals(
                {
                  growDirection: HORIZONTAL_TYPE,
                  multiline: true,
                },
                intervals,
                getHorizontalRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  viewCellsData,
                  cellElements: timeTableRef.querySelectorAll('td'),
                },
              ) : [];
              const { appointmentPlaceholder: AppointmentPlaceholder } = this;
              return (
                <React.Fragment>
                  <TimeTable
                    rowComponent={TimeTableRow}
                    cellComponent={this.cellPlaceholder}
                    tableRef={this.timeTableRef}
                    cellsData={viewCellsData}
                  />
                  <AppointmentLayer>
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
                  </AppointmentLayer>
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

MonthView.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  dayScaleLayoutComponent: PropTypes.func.isRequired,
  dayScaleCellComponent: PropTypes.func.isRequired,
  dayScaleRowComponent: PropTypes.func.isRequired,
  timeTableLayoutComponent: PropTypes.func.isRequired,
  timeTableRowComponent: PropTypes.func.isRequired,
  timeTableCellComponent: PropTypes.func.isRequired,
  appointmentLayerComponent: PropTypes.func.isRequired,
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
  appointmentLayerComponent: 'AppointmentLayer',
  dayScaleLayoutComponent: 'DayScaleLayout',
  dayScaleCellComponent: 'DayScaleCell',
  dayScaleRowComponent: 'DayScaleRow',
  timeTableLayoutComponent: 'TimeTableLayout',
  timeTableCellComponent: 'TimeTableCell',
  timeTableRowComponent: 'TimeTableRow',
};
