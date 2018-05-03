import * as React from 'react';
import * as PropTypes from 'prop-types';
import { baseSeries } from './base-series';

class Series extends React.PureComponent {
  render() {
    const { attributes, barWidth: percentWidth, ...props } = this.props;
    const {
      pointComponent: Point,
      ...restProps
    } = props;
    const {
      coordinates, scales, height,
    } = attributes;
    const bandwidth = scales.xScale.bandwidth();
    const barWidth = bandwidth * percentWidth;
    const xCorrection = ((bandwidth - barWidth) / 2);
    return (
      coordinates.map(item =>
        (
          <Point
            key={item.id.toString()}
            x={item.x + xCorrection}
            y={item.y}
            width={barWidth}
            height={height - item.y}
            {...restProps}
          />
        ))
    );
  }
}

export const BarSeries = baseSeries(Series, 'BarSeries');

Series.propTypes = {
  barWidth: PropTypes.number,
  attributes: PropTypes.object.isRequired,
  pointComponent: PropTypes.func.isRequired,
};

Series.defaultProps = {
  barWidth: 0.7,
};
