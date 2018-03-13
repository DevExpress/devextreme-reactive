import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { getArgumentAxisName } from '@devexpress/dx-chart-core';

export class ChartCore extends React.PureComponent {
  render() {
    const {
      data, axes, series,
    } = this.props;
    const argumentAxisName = getArgumentAxisName(axes);

    return (
      <Plugin>
        <Getter name="data" value={data} />
        <Getter name="axes" value={axes} />
        <Getter name="series" value={series} />
        <Getter name="argumentAxisName" value={argumentAxisName} />
      </Plugin>
    );
  }
}

ChartCore.propTypes = {
  data: PropTypes.array.isRequired,
  axes: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
};
