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
  timeScale as getTimeScale,
  dayScale as getDayScale,
  startViewDate, endViewDate,
} from '@devexpress/dx-scheduler-core';

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
      weekends,
    } = this.props;

    const timeScaleComputed = getTimeScale(startDayHour, endDayHour, cellDuration);
    const dayScaleComputed = ({ currentDate }) =>
      getDayScale(currentDate, firstDayOfWeek, intervalCount * 7, weekends);
    const startViewDateComputed = ({ dayScale, timeScale }) => startViewDate(dayScale, timeScale);
    const endViewDateComputed = ({ dayScale, timeScale }) => endViewDate(dayScale, timeScale);

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="timeScale" value={timeScaleComputed} />
        <Getter name="dayScale" computed={dayScaleComputed} />
        <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />
        <Getter name="cellDuration" value={cellDuration} />
        {this.state.dateTableRef && <Getter name="dateTableRef" value={this.state.dateTableRef} />}

        <Template name="body">
          <ViewLayout
            navbarComponent={DayScalePlaceholder}
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
                tableComponent={DayScaleTable}
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
                tableComponent={TimePanelTable}
                timeScale={timeScale}
              />
            )}
          </TemplateConnector>
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
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
  weekends: PropTypes.array,
};

WeekView.defaultProps = {
  startDayHour: 0,
  endDayHour: 24,
  cellDuration: 30,
  intervalCount: 1,
  firstDayOfWeek: 0,
  weekends: [],
};
