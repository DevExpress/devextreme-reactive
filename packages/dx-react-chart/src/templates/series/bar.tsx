import * as React from 'react';
import {
  HOVERED, SELECTED, dBar, getVisibility, adjustBarSize,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { BarSeries } from '../../types';

class RawBar extends React.PureComponent<BarSeries.PointProps, any> {
  animationId: any = undefined;
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      style: undefined,
    };
    this.setAttribute = this.setAttribute.bind(this);
  }

  setAttribute(x, y, style?) {
    this.setState({ x, y, style });
  }

  componentDidUpdate({
    arg: prevArg, val: prevVal, rotated: prevRotated, argument: prevArgument, value: prevValue,
  }) {
    const {
      arg, val, rotated, animation, scales, argument, value,
    } = this.props;
    const x = arg;
    const y = val;
    const prevX = prevArg;
    const prevY = prevVal;
    if (animation && (prevArg !== arg || prevVal !== val || prevRotated !== rotated)) {
      if (argument === prevArgument && value === prevValue) {
        this.animationId = animation(
          null, { x, y }, scales, rotated, this.setAttribute, this.animationId,
        );
      } else {
        this.animationId = animation(
          { x: prevX, y: prevY }, { x, y }, scales, rotated, this.setAttribute, this.animationId,
        );
      }
    } else if (!animation) {
      this.setAttribute(x, y);
    }
  }

  render() {
    const { x, y, style: animateStyle } = this.state;
    const {
      arg, val, startVal, barWidth, maxBarWidth, animation,
      argument, value, seriesIndex, index, state, rotated,
      color, pane,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    const width = barWidth * maxBarWidth;
    const bar = dBar(x, y, startVal!, width, rotated);
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
