import * as React from 'react';
import * as PropTypes from 'prop-types';

export class WeekLayout extends React.PureComponent {
  render() {
    const {
      dateTableComponent: DateTable,
      timeScaleComponent: TimeScale,
      dayScaleComponent: DayScale,
      ...restProps
    } = this.props;

    return (
      <div
        {...restProps}
      >
        <DateTable />
        <TimeScale />
        <DayScale />
      </div>
    );
  }
}

WeekLayout.propTypes = {
  dateTableComponent: PropTypes.func.isRequired,
  timeScaleComponent: PropTypes.func,
  dayScaleComponent: PropTypes.func,
};

WeekLayout.defaultProps = {
  timeScaleComponent: () => null,
  dayScaleComponent: () => null,
};
