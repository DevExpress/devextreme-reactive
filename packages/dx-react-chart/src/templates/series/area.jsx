import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getAreaAnimationStyle, HOVERED, SELECTED } from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

class RawArea extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      index,
      style,
      getAnimatedStyle,
      scales,
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
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
};

RawArea.defaultProps = {
  color: undefined,
  style: undefined,
};

export const Area = withStates({
  [HOVERED]: withPattern(
    ({ index }) => `series-${index}-hover`, { opacity: 0.75 },
  )(RawArea),
  [SELECTED]: withPattern(
    ({ index }) => `series-${index}-selection`, { opacity: 0.5 },
  )(RawArea),
})(RawArea);
