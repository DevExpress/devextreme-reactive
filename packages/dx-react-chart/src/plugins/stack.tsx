import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { getStackedSeries, getStackedDomains } from '@devexpress/dx-chart-core';
import { StackProps, StacksOptions, OffsetFn, OrderFn } from '../types';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

const getDomains = ({ domains, series }: Getters) => getStackedDomains(domains, series);

class StackBase extends React.PureComponent<StackProps> {
  static defaultProps: Partial<StackProps> = {
    stacks: [],
    offset: stackOffsetDiverging as OffsetFn,
    order: stackOrderNone as OrderFn,
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
        <Getter name="domains" computed={getDomains} />
      </Plugin>
    );
  }
}

export const Stack: React.ComponentType<StackProps> = StackBase;
