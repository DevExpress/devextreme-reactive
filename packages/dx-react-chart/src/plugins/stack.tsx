import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { getStackedSeries } from '@devexpress/dx-chart-core';
import { StackProps, StacksOptions } from '../types';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

/** @internal */
export class Stack extends React.PureComponent<StackProps> {
  static defaultProps: Partial<StackProps> = {
    stacks: [],
    offset: stackOffsetDiverging,
    order: stackOrderNone,
  };

  render() {
    const { stacks, offset, order } = this.props;
    const params: StacksOptions = {
      stacks: stacks!,
      offset: offset!,
      order: order!,
    };
    const getSeries = ({ series, data }: Getters) => getStackedSeries(series, data, params);
    return (
      <Plugin name="Stack">
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}
