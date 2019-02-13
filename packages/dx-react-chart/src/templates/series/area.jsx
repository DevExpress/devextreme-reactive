import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  dArea, getAreaAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

class RawArea extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      index, state, pointComponent,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        fill={color}
        opacity={0.5}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

RawArea.propTypes = {
  path: PropTypes.func,
  coordinates: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  state: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  scales: PropTypes.object.isRequired,
  getAnimatedStyle: PropTypes.func.isRequired,
  pointComponent: PropTypes.func,
};

RawArea.defaultProps = {
  path: dArea,
  state: undefined,
  color: undefined,
  style: undefined,
  pointComponent: undefined,
};

export const Area = withStates({
  [HOVERED]: withPattern(
    ({ index }) => `series-${index}-hover`, { opacity: 0.75 },
  )(RawArea),
  [SELECTED]: withPattern(
    ({ index }) => `series-${index}-selection`, { opacity: 0.5 },
  )(RawArea),
})(RawArea);
