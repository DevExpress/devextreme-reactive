import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pointAttributes } from '@devexpress/dx-chart-core';
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
  const { point = {} } = props;
  return { size: point.size };
};

export const ScatterSeries = hocSeries(
  EmptyFunction,
  Dot,
  'ScatterSeries',
  'scatter',
  EmptyFunction,
  pointAttributes,
  options,
);

Dot.propTypes = {
  pointComponent: PropTypes.func.isRequired,
};
