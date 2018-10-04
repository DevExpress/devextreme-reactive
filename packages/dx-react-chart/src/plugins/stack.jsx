import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import {
  buildStackedSeries,
  buildStackedDataProcessor,
  clearStackedSeries,
  getStacks as getStacksCore,
} from '@devexpress/dx-chart-core';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

const getSeries = ({ series }) => buildStackedSeries(series);
const getClearedSeries = ({ series }) => clearStackedSeries(series);
const getStacks = ({ series }) => getStacksCore(series);

export class Stack extends React.PureComponent {
  render() {
    const { offset, order } = this.props;
    const processStackedData = buildStackedDataProcessor(offset, order);
    const getData = ({ data, series }) => processStackedData(data, series);
    return (
      <Plugin name="Stack">
        <Getter name="series" computed={getSeries} />
        <Getter name="data" computed={getData} />
        <Getter name="series" computed={getClearedSeries} />
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
