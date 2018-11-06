import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { getStackedSeries } from '@devexpress/dx-chart-core';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

export class Stack extends React.PureComponent {
  render() {
    const { stacks, offset, order } = this.props;
    const params = { stacks, offset, order };
    const getSeries = ({ series, data }) => getStackedSeries(series, data, params);
    return (
      <Plugin name="Stack">
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}

Stack.propTypes = {
  stacks: PropTypes.arrayOf(PropTypes.shape({
    series: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
  offset: PropTypes.func,
  order: PropTypes.func,
};

Stack.defaultProps = {
  stacks: [],
  offset: stackOffsetDiverging,
  order: stackOrderNone,
};
