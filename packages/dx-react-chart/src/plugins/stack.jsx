import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import {
  getStackedSeries,
  getStacks as getStacksCore,
} from '@devexpress/dx-chart-core';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

const getStacks = ({ series }) => getStacksCore(series);

export class Stack extends React.PureComponent {
  render() {
    const { offset, order } = this.props;
    const getSeries = ({ series, data }) => getStackedSeries(series, data, offset, order);
    return (
      <Plugin name="Stack">
        <Getter name="series" computed={getSeries} />
        <Getter name="stacks" computed={getStacks} />
      </Plugin>
    );
  }
}

Stack.propTypes = {
  offset: PropTypes.func,
  order: PropTypes.func,
};

Stack.defaultProps = {
  offset: stackOffsetDiverging,
  order: stackOrderNone,
};
