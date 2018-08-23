import * as React from 'react';
import * as PropTypes from 'prop-types';
import { pieAttributes } from '@devexpress/dx-chart-core';
import { withSeriesPlugin } from '../utils';

const Series = ({
  ...props
}) => {
  const {
    pointComponent: Point,
    coordinates,
    colorDomain,
    uniqueName,
    ...restProps
  } = props;
  const { innerRadius, outerRadius, ...pointOptions } = restProps;
  return (coordinates.map(item => (
    <Point
      key={item.id.toString()}
      {...item}
      {...pointOptions}
      color={colorDomain(item.id)}
    />
  )));
};

export const PieSeries = withSeriesPlugin(
  Series,
  'PieSeries',
  'arc',
  pieAttributes,
);


Series.propTypes = {
  style: PropTypes.object,
  pointComponent: PropTypes.func.isRequired,
};

Series.defaultProps = {
  style: {},
};
