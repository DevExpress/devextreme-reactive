import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pieAttributes } from '@devexpress/dx-chart-core';
import { withSeriesPlugin } from '../utils/series-helper';

const EmptyFunction = () => null;

const Dot = ({
  ...props
}) => {
  const {
    pointComponent: Point,
    data,
    ...restProps
  } = props;
  return (
    <Point
      {...restProps}
      color={data.color}
    />
  );
};

const options = ({ ...props }) => ({ style: props.style });

export const PieSeries = withSeriesPlugin(
  EmptyFunction,
  Dot,
  'PieSeries',
  'arc',
  EmptyFunction,
  () => item => item,
  options,
  pieAttributes,
);


Dot.propTypes = {
  style: PropTypes.object,
  pointComponent: PropTypes.func.isRequired,
  data: PropTypes.object,
};

Dot.defaultProps = {
  style: {},
  data: {},
};
