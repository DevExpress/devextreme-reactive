import * as React from 'react';
import * as PropTypes from 'prop-types';
import { barPointAttributes } from '@devexpress/dx-chart-core';
import { baseSeries } from './base-series';

const EmptyFunction = () => null;

const Dot = ({
  ...props
}) => {
  const {
    pointComponent: Point,
    ...restProps
  } = props;
  return (
    <Point
      {...restProps}
    />
  );
};

export const BarSeries = baseSeries(EmptyFunction, Dot, 'BarSeries', 'bar', EmptyFunction, barPointAttributes);

Dot.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
