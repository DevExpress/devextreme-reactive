import * as React from 'react';
import * as PropTypes from 'prop-types';
import { baseSeries } from './base-series';

const Series = ({
  attributes, ...props
}) => {
  const {
    pointComponent: Point,
    ...restProps
  } = props;
  const { dPoint, coordinates } = attributes;
  return (
    <React.Fragment>
      {
        coordinates.map(item =>
          (<Point
            key={item.x.toString()}
            x={item.x}
            y={item.y}
            d={dPoint}
            {...restProps}
          />
          ))
      }
    </React.Fragment>
  );
};

export const ScatterSeries = baseSeries(Series, 'ScatterSeries');

Series.propTypes = {
  attributes: PropTypes.object.isRequired,
  pointComponent: PropTypes.func.isRequired,
};
