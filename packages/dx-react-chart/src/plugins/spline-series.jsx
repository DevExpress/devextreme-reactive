import * as React from 'react';
import * as PropTypes from 'prop-types';
import { baseSeries } from './base-series';

const Series = ({
  attributes, ...props
}) => {
  const {
    point,
    pathComponent: Path,
    pointComponent: Point,
    ...restProps
  } = props;
  const { d, dPoint, coordinates } = attributes;
  return (
    <React.Fragment>
      <Path
        x={0}
        y={0}
        d={d}
        {...restProps}
      />
      {
        point.visible ? coordinates.map(item =>
          (<Point
            key={item.x.toString()}
            x={item.x}
            y={item.y}
            d={dPoint}
            {...point}
          />
        )) : null
      }
    </React.Fragment>
  );
};

export const SplineSeries = baseSeries(Series, 'SplineSeries', 'spline');

Series.propTypes = {
  attributes: PropTypes.object.isRequired,
  point: PropTypes.object,
  pointComponent: PropTypes.func.isRequired,
  pathComponent: PropTypes.func.isRequired,
};

Series.defaultProps = {
  point: { visible: false },
};
