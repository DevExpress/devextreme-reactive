import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  dBar, getAreaAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

class RawBar extends React.PureComponent {
  render() {
    const {
      x, barWidth, y, y1, maxBarWidth,
      argument, value, seriesIndex, index, state,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    const attributes = dBar({
      x, width: maxBarWidth * barWidth, y, y1,
    });
    return (
      <rect
        {...attributes}
        fill={color}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

RawBar.propTypes = {
  argument: PropTypes.any.isRequired,
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  barWidth: PropTypes.number.isRequired,
  maxBarWidth: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  seriesIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  state: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  scales: PropTypes.object.isRequired,
  getAnimatedStyle: PropTypes.func.isRequired,
};

RawBar.defaultProps = {
  state: undefined,
  color: undefined,
  style: undefined,
};

export const Bar = withStates({
  [HOVERED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawBar),
  [SELECTED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawBar),
})(RawBar);
