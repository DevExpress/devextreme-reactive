import * as React from 'react';
import * as PropTypes from 'prop-types';
// TODO: Is it fine to have it hard coded or should there be `path` property?
import { getAreaAnimationStyle, dBar } from '@devexpress/dx-chart-core';

export class BarCollection extends React.PureComponent {
  render() {
    const {
      pointComponent: Point,
      path, // Not used - see note above.
      coordinates,
      style,
      scales,
      getAnimatedStyle,
      ...restProps
    } = this.props;
    return (coordinates.map(item => (
      <Point
        key={item.index.toString()}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
        {...dBar(item)}
        {...item}
      />
    )));
  }
}

BarCollection.propTypes = {
  pointComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
};

BarCollection.defaultProps = {
  style: undefined,
};
