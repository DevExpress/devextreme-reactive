import * as React from 'react';
import * as PropTypes from 'prop-types';
import { barPointAttributes } from '@devexpress/dx-chart-core';
import { hocSeries } from './hoc-series';

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

const options = ({ ...props }) => {
  const { barWidth = 0.9, groupWidth = 0.7 } = props;
  return { barWidth, groupWidth };
};

export const BarSeries = hocSeries(
  EmptyFunction,
  Dot,
  'BarSeries',
  'bar',
  EmptyFunction,
  barPointAttributes,
  options,
);

Dot.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
