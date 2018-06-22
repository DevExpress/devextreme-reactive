import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  TemplatePlaceholder,
  Plugin,
} from '@devexpress/dx-react-core';

export class WeekView extends React.PureComponent {
  render() {
    const {
      rootComponent: Root,
      dateTableComponent: DateTable,
      timeScaleComponent: TimeScale,
      dayScaleComponent: DayScale,
    } = this.props;

    return (
      <Plugin
        name="WeekView"
      >
        <Template name="body">
          <TemplatePlaceholder name="view" />
        </Template>
        <Template name="view">
          <Root
            dateTableComponent={DateTable}
            timeScaleComponent={TimeScale}
            dayScaleComponent={DayScale}
          />
        </Template>
      </Plugin>
    );
  }
}

WeekView.propTypes = {
  rootComponent: PropTypes.func.isRequired,
  dateTableComponent: PropTypes.func.isRequired,
  timeScaleComponent: PropTypes.func.isRequired,
  dayScaleComponent: PropTypes.func.isRequired,
};
