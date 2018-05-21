import * as React from 'react';
import * as PropTypes from 'prop-types';
import { lineAttributes, pointAttributes } from '@devexpress/dx-chart-core';
import { baseSeries } from './base-series';

const Series = ({
  ...props
}) => {
  const {
    seriesComponent: Path,
    ...restProps
  } = props;
  return (
    <Path {...restProps} />
  );
};

const Dot = ({
  ...props
}) => {
  const {
    pointStyle,
    pointComponent: Point,
    ...restProps
  } = props;
  return (
    <Point
      {...restProps}
      style={pointStyle}
    />
  );
};

export const SplineSeries = baseSeries(Series, Dot, 'SplineSeries', 'spline', lineAttributes, pointAttributes);

Series.propTypes = {
  seriesComponent: PropTypes.func.isRequired,
};

Dot.propTypes = {
  pointStyle: PropTypes.object,
  pointComponent: PropTypes.func.isRequired,
};

Dot.defaultProps = {
  pointStyle: {},
};
