import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { processData, seriesWithStacks, stacks } from '@devexpress/dx-chart-core';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

const computedSeries = ({ series = [] }) => seriesWithStacks(series);

export class Stack extends React.PureComponent {
  render() {
    const { offset, order } = this.props;
    const computedStacks = ({ series = [] }) => stacks(series);
    return (
      <Plugin name="Stack">
        <Getter name="series" computed={computedSeries} />
        <Getter name="processingData" value={processData(offset, order)} />
        <Getter name="stacks" computed={computedStacks} />
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
