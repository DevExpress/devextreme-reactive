import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { timeUnits as timeUnitsComputed } from '@devexpress/dx-scheduler-core';

const SidebarPlaceholder = props => (
  <TemplatePlaceholder name="sidebar" params={props} />
);

export class WeekView extends React.PureComponent {
  render() {
    const {
      layoutComponent: ViewLayout,
      timeScaleLayoutComponent: TimeScale,
      timeScaleTableComponent: TimeScaleTable,
      timeScaleRowComponent: TimeScaleRow,
      timeScaleCellComponent: TimeScaleCell,
      startDayHour,
      endDayHour,
      cellDuration,
      firstDayOfWeek,
    } = this.props;

    const timeUnitsValue = timeUnitsComputed(startDayHour, endDayHour, cellDuration);

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="timeUnits" value={timeUnitsValue} />
        <Getter name="firstDayOfWeek" value={firstDayOfWeek} />
        <Template name="body">
          <ViewLayout
            // headerComponent={}
            // mainComponent={}
            sidebarComponent={SidebarPlaceholder}
          />
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
  startDayHour: PropTypes.number,
  endDayHour: PropTypes.number,
  cellDuration: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
};

WeekView.defaultProps = {
  startDayHour: 0,
  endDayHour: 24,
  cellDuration: 30,
  firstDayOfWeek: 0,
};
