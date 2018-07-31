import * as React from 'react';
import * as PropTypes from 'prop-types';
import { lineAttributes, pointAttributes } from '@devexpress/dx-chart-core';
import { withSeriesPlugin } from '../utils/series-helper';

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

const options = ({ ...props }) => {
  const { point = {} } = props;
  return { size: point.size };
};

export const LineSeries = withSeriesPlugin(
  Series,
  Dot,
  'LineSeries',
  'line',
  lineAttributes,
  pointAttributes,
  options,
);

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
