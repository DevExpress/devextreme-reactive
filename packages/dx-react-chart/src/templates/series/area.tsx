import * as React from 'react';
import {
  HOVERED, SELECTED, dArea, dRotateArea, isArrayValuesChanged,
  processAreaAnimation, getStartCoordinates, PathPoints, UpdateAnimate,
  isScalesChanged,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { AreaSeries, AreaSeriesState } from '../../types';

class RawArea extends React.PureComponent<AreaSeries.SeriesProps, AreaSeriesState> {
  animate: UpdateAnimate | undefined;
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      style: undefined,
    };
    this.setAttribute = this.setAttribute.bind(this);
  }

  setAttribute({ coordinates, style }: { coordinates: PathPoints, style?: React.CSSProperties }) {
    this.setState({ coordinates, style });
  }

  componentDidMount() {
    const {
      coordinates, animation, scales,
    } = this.props;
    if (!animation) {
      this.setAttribute({ coordinates });
    } else {
      this.animate = animation(
        getStartCoordinates(scales, coordinates), coordinates,
        processAreaAnimation, this.setAttribute,
      );
    }
  }

  componentDidUpdate({
    coordinates: prevCoordinates, scales: prevScales,
  }) {
    const {
      coordinates, scales,
    } = this.props;

    if (this.animate) {
      if (prevCoordinates.length !== coordinates.length) {
        this.animate.update(getStartCoordinates(scales, coordinates), coordinates);
      } else if (isScalesChanged(prevScales, scales)) {
        this.setAttribute({ coordinates });
      } else if (isArrayValuesChanged(prevCoordinates, coordinates, 'arg', 'val')) {
        this.animate.update(prevCoordinates, coordinates);
      }
    } else {
      this.setAttribute({ coordinates });
    }
  }

  componentWillUnmount() {
    return this.animate && this.animate.stop();
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
      color, clipPathId, pane,
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
