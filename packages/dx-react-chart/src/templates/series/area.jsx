import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  getAreaAnimationStyle, DEFAULT, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { Pattern } from '../pattern';
import { withStates } from '../../utils/with-states';

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

const getPatternIdUrl = (prefix, id) => {
  const value = `${prefix}-${id}`;
  return [value, `url(#${value})`];
};

export const Area = withStates({
  [DEFAULT]: props => ({ key: 'element', ...props }),
  [HOVERED]: ({ color, index, ...restProps }) => {
    const [patternId, patternUrl] = getPatternIdUrl('series-hover', index);
    return (
      <React.Fragment>
        <Pattern
          key="pattern"
          id={patternId}
          color={color}
          opacity={0.75}
        />
        <RawArea
          key="element"
          color={patternUrl}
          {...restProps}
        />
      </React.Fragment>
    );
  },
  [SELECTED]: ({ color, index, ...restProps }) => {
    const [patternId, patternUrl] = getPatternIdUrl('series-selection', index);
    return (
      <React.Fragment>
        <Pattern
          key="pattern"
          id={patternId}
          color={color}
          opacity={0.85}
        />
        <RawArea
          key="element"
          color={patternUrl}
          {...restProps}
        />
      </React.Fragment>
    );
  },
})(RawArea);
