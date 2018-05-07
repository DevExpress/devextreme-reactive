import * as React from 'react';
import * as PropTypes from 'prop-types';
import { lineAttributes, pointAttributes } from '@devexpress/dx-chart-core';
import { baseSeries } from './base-series';

const Series = ({
  ...props
}) => {
  const {
    pathComponent: Path,
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

export const LineSeries = baseSeries(Series, Dot, 'LineSeries', 'line', lineAttributes, pointAttributes);

Series.propTypes = {
  pathComponent: PropTypes.func.isRequired,
};

Dot.propTypes = {
  pointStyle: PropTypes.object,
  pointComponent: PropTypes.func.isRequired,
};

Dot.defaultProps = {
  pointStyle: {},
};
