import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pointAttributes } from '@devexpress/dx-chart-core';
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

export const ScatterSeries = baseSeries(EmptyFunction, Dot, 'ScatterSeries', 'scatter', EmptyFunction, pointAttributes);

Dot.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
