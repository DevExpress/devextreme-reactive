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
  timeUnits as timeUnitsComputed,
  dayUnits as dayUnitsComputed,
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
  render() {
    const {
      layoutComponent: ViewLayout,
      timeScaleLayoutComponent: TimeScale,
      timeScaleTableComponent: TimeScaleTable,
      timeScaleRowComponent: TimeScaleRow,
      timeScaleCellComponent: TimeScaleCell,
      dayScaleLayoutComponent: DayScale,
      dayScaleTableComponent: DayScaleTable,
      dayScaleCellComponent: DayScaleCell,
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

    const timeUnitsValue = timeUnitsComputed(startDayHour, endDayHour, cellDuration);
    const dayUnitsValue = ({ currentDate }) =>
      dayUnitsComputed(currentDate, firstDayOfWeek, intervalCount * 7, weekends);
    const startViewDateComputed = ({ dayUnits, timeUnits }) => startViewDate(dayUnits, timeUnits);
    const endViewDateComputed = ({ dayUnits, timeUnits }) => endViewDate(dayUnits, timeUnits);

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="timeUnits" value={timeUnitsValue} />
        <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
        <Getter name="dayUnits" computed={dayUnitsValue} />
        <Getter name="startViewDate" computed={startViewDateComputed} />
        <Getter name="endViewDate" computed={endViewDateComputed} />
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
            {({ dayUnits }) => (
              <DayScale
                rowComponent={TimeScaleRow}
                cellComponent={DayScaleCell}
                tableComponent={DayScaleTable}
                dayUnits={dayUnits}
              />
            )}
          </TemplateConnector>
        </Template>

        <Template name="sidebar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ timeUnits }) => (
              <TimeScale
                rowComponent={TimeScaleRow}
                cellComponent={TimeScaleCell}
                tableComponent={TimeScaleTable}
                timeUnits={timeUnits}
              />
            )}
          </TemplateConnector>
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ timeUnits, dayUnits }) => (
              <DateTable
                rowComponent={DateTableRow}
                cellComponent={DateTableCell}
                tableComponent={DateTableTable}
                timeUnits={timeUnits}
                dayUnits={dayUnits}
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
  timeScaleLayoutComponent: PropTypes.func.isRequired,
  timeScaleTableComponent: PropTypes.func.isRequired,
  timeScaleRowComponent: PropTypes.func.isRequired,
  timeScaleCellComponent: PropTypes.func.isRequired,
  dayScaleLayoutComponent: PropTypes.func.isRequired,
  dayScaleTableComponent: PropTypes.func.isRequired,
  dayScaleCellComponent: PropTypes.func.isRequired,
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
