import * as React from 'react';
import {
  processLineAnimation, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { PathComponentPathProps } from '../../types';

class RawPath extends React.PureComponent<PathComponentPathProps, any> {
  animationId: any = undefined;
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
      coordinates, rotated, animation, scales,
    } = this.props;
    if (animation) {
      this.animationId = animation(
        processLineAnimation(null, coordinates, scales, rotated),
        this.setAttribute,
        this.animationId,
    );
    } else {
      this.setAttribute({ coordinates });
    }
  }

  componentDidUpdate({
    coordinates: prevCoordinates, rotated: prevRotated,
  }) {
    const {
      coordinates, rotated, animation, scales,
    } = this.props;
    if (animation && (coordinates !== prevCoordinates || prevRotated !== rotated)) {
      this.animationId = animation(
        processLineAnimation(prevCoordinates, coordinates, scales, rotated),
        this.setAttribute,
        this.animationId,
        );
    }
  }

  render() {
    const { coordinates: coords, style: animateStyle } = this.state;
    const {
      path, animation,
      coordinates, rotated,
      index, state, pointComponent,
      color, clipPathId,
      style, scales, getAnimatedStyle,
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
