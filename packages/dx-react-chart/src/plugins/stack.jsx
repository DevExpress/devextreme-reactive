import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { processData, seriesWithStacks, stacks, filtering } from '@devexpress/dx-chart-core';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

const computedSeries = ({ series = [] }) => seriesWithStacks(series);

// eslint-disable-next-line react/prefer-stateless-function
export class Stack extends React.PureComponent {
  render() {
    const { offset, order, filter } = this.props;
    const computedStacks = ({ series = [] }) => stacks(series, filter);
    return (
      <Plugin name="Stack" >
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
  filter: PropTypes.func,
};

Stack.defaultProps = {
  offset: stackOffsetDiverging,
  order: stackOrderNone,
  filter: filtering,
};
