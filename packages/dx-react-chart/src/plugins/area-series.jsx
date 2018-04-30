import * as React from 'react';
import * as PropTypes from 'prop-types';
import { baseSeries } from './base-series';

const Series = ({
  attributes, ...props
}) => {
  const {
    pointStyle,
    pathComponent: Path,
    pointComponent: Point,
    ...restProps
  } = props;
  const {
    d, dPoint, coordinates,
  } = attributes;
  return (
    <React.Fragment>
      <Path
        x={0}
        y={0}
        d={d}
        {...restProps}
      />
      {
        coordinates.map(item =>
          (
            <Point
              key={item.id.toString()}
              x={item.x}
              y={item.y}
              d={dPoint}
              style={pointStyle}
            />
        ))
      }
    </React.Fragment>
  );
};

export const AreaSeries = baseSeries(Series, 'AreaSeries', 'area');

Series.propTypes = {
  attributes: PropTypes.object.isRequired,
  pointStyle: PropTypes.object,
  pointComponent: PropTypes.func.isRequired,
  pathComponent: PropTypes.func.isRequired,
};

Series.defaultProps = {
  pointStyle: {},
};
