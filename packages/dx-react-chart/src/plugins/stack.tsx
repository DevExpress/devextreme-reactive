import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { getStackedSeries } from '@devexpress/dx-chart-core';
import { StackProps } from '../types';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

const defaultProps = {
  stacks: [],
  offset: stackOffsetDiverging,
  order: stackOrderNone,
};
/** @internal */
export class Stack extends React.PureComponent<StackProps & typeof defaultProps> {
  static defaultProps = {
    stacks: [],
    offset: stackOffsetDiverging,
    order: stackOrderNone,
  };
  render() {
    const { stacks, offset, order } = this.props;
    const params = { stacks, offset, order };
    const getSeries = ({ series, data }: Getters) => getStackedSeries(series, data, params);
    return (
      <Plugin name="Stack">
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}
