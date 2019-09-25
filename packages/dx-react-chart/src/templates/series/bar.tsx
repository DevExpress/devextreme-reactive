import * as React from 'react';
import {
  processBarAnimation, HOVERED, SELECTED, dBar, getVisibility, adjustBarSize,
  isValuesChanged, getStartVal, Animation, isScalesChanged,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { BarSeries, BarSeriesState } from '../../types';

class RawBar extends React.PureComponent<BarSeries.PointProps, BarSeriesState> {
  animate: Animation | undefined;
  constructor(props) {
    super(props);

    this.state = {
      x: undefined,
      y: undefined,
      startY: undefined,
      style: undefined,
    };
    this.setAttribute = this.setAttribute.bind(this);
  }

  setAttribute({ x, y, startY, style }: {
    x: number, y: number, startY: number, style?: React.CSSProperties,
  }) {
    this.setState({ x, y, startY, style });
  }

  componentDidMount() {
    const {
      arg, val, startVal, animation, scales,
    } = this.props;
    if (!animation) {
      this.setAttribute({ x: arg, y: val, startY: startVal });
    } else {
      const start = getStartVal(scales);
      this.animate = animation(
        { x: arg, y: start, startY: start },
        { x: arg, y: val, startY: startVal },
        processBarAnimation, this.setAttribute,
      );
    }
  }

  componentDidUpdate({
    arg: prevArg, val: prevVal, startVal: prevStartVal, scales: prevScales,
  }) {
    const {
      arg, val, startVal, scales,
    } = this.props;

    if (this.animate) {
      if (isScalesChanged(prevScales, scales)) {
        this.setAttribute({ x: arg, y: val, startY: startVal! });
      } else if (isValuesChanged([prevArg, prevVal, prevStartVal], [arg, val, startVal])) {
        this.animate.update(
          { x: prevArg, y: prevVal, startY: prevStartVal }, { x: arg, y: val, startY: startVal },
        );
      }
    } else {
      this.setAttribute({ x: arg, y: val, startY: startVal! });
    }
  }

  componentWillUnmount() {
    return this.animate && this.animate.stop();
  }

  render() {
    const { x, y, startY, style: animateStyle } = this.state;
    if (x === undefined && y === undefined && startY === undefined) {
      return null;
    }
    const {
      arg, val, startVal, barWidth, maxBarWidth, animation,
      argument, value, seriesIndex, index, state, rotated,
      color, pane,
      style, scales,
      ...restProps
    } = this.props;
    const width = barWidth * maxBarWidth;
    const bar = dBar(x!, y!, startY!, width, rotated);
    const visibility = getVisibility(
      pane, bar.x + bar.width / 2, bar.y + bar.height, bar.width, bar.height,
    );
    const adjustedBar = visibility === 'visible' ? adjustBarSize(bar, pane) : bar;
    return (
      <rect
        {...adjustedBar}
        fill={color}
        visibility={visibility}
        style={{ ...style, ...animateStyle }}
        {...restProps}
      />
    );
  }
}

// It should actually be `withPattern<BarSeries.PointProps>` but `opacity` is not decleared there.
// It is not clear if `opacity` should be explicitly enumerated or stay as part of `restProps`.

export const Bar: React.ComponentType<BarSeries.PointProps> = withStates({
  [HOVERED]: withPattern<any>(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawBar),
  [SELECTED]: withPattern<any>(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawBar),
})(RawBar);
