import * as React from 'react';
import {
  HOVERED, SELECTED, dArea, dRotateArea, isArrayValuesChanged,
  processAreaAnimation, getStartCoordinates,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { AreaSeries } from '../../types';

class RawArea extends React.PureComponent<AreaSeries.SeriesProps, any> {
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
      processAreaAnimation, this.setAttribute);
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
      path,
      coordinates, animation,
      index, state, pointComponent,
      color, clipPathId,
      style, scales, rotated,
      ...restProps
    } = this.props;
    const dPath = path === undefined ? (rotated ? dRotateArea : dArea) : path;
    return (
      <path
        clipPath={`url(#${clipPathId})`}
        d={dPath!(coords)}
        fill={color}
        opacity={0.5}
        style={{ ...style, ...animateStyle }}
        {...restProps}
      />
    );
  }
}

// It should actually be `withPattern<AreaSeries.PointProps>` but `opacity` is not decleared there.
// It is not clear if `opacity` should be explicitly enumerated or stay as part of `restProps`.

export const Area: React.ComponentType<AreaSeries.SeriesProps> = withStates({
  [HOVERED]: withPattern<any>(
    ({ index }) => `series-${index}-hover`, { opacity: 0.75 },
  )(RawArea),
  [SELECTED]: withPattern<any>(
    ({ index }) => `series-${index}-selection`, { opacity: 0.5 },
  )(RawArea),
})(RawArea);
