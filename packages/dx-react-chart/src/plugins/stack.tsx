import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { getStackedSeries, StackList, OffsetFn, OrderFn } from '@devexpress/dx-chart-core';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

const defaultProps = {
  stacks: [],
  offset: stackOffsetDiverging,
  order: stackOrderNone,
};
type StackProps = {
  stacks: StackList,
  offset: OffsetFn,
  order: OrderFn,
};

export class Stack extends React.PureComponent<StackProps> {
  static defaultProps = defaultProps;
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
