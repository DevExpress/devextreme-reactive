import * as React from 'react';
import {
  processLineAnimation, HOVERED, SELECTED, isArrayValuesChanged, getStartCoordinates,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { PathComponentPathProps } from '../../types';

class RawPath extends React.PureComponent<PathComponentPathProps, any> {
  animate: any = undefined;
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      style: undefined,
    };
    this.setAttribute = this.setAttribute.bind(this);
  }

  setAttribute({ coordinates, style }: { coordinates: any, style?: any}) {
    this.setState({ coordinates, style });
  }

  componentDidMount() {
    const {
      coordinates, animation,
    } = this.props;
    if (!animation) {
      this.setAttribute({ coordinates });
    }
  }

  componentDidUpdate({
    coordinates: prevCoordinates,
  }) {
    const {
      coordinates, animation, scales,
    } = this.props;

    if (animation && !this.animate) {
      this.animate = animation(getStartCoordinates(scales, coordinates), coordinates,
        processLineAnimation, this.setAttribute);
    } else if (this.animate
      && isArrayValuesChanged(prevCoordinates, coordinates, 'argument', 'value')) {
      this.animate.update(prevCoordinates, coordinates);
    } else if (isArrayValuesChanged(prevCoordinates, coordinates, 'arg', 'val')) {
      this.setAttribute({ coordinates });
    }
  }

  render() {
    const { coordinates: coords, style: animateStyle } = this.state;
    if (!coords.length) {
      return null;
    }
    const {
      path, animation,
      coordinates, rotated,
      index, state, pointComponent,
      color, clipPathId,
      style, scales,
      ...restProps
    } = this.props;
    return (
      <path
        clipPath={`url(#${clipPathId})`}
        d={path!(coords)}
        fill="none"
        strokeWidth={2}
        stroke={color}
        style={{ ...style, ...animateStyle }}
        {...restProps}
      />
    );
  }
}

export const Path = withStates({
  [HOVERED]: props => ({ strokeWidth: 4, ...props }),
  [SELECTED]: props => ({ strokeWidth: 4, ...props }),
})(RawPath);
