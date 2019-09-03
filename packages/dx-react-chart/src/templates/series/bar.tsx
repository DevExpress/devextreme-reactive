import * as React from 'react';
import {
  processPointAnimation, HOVERED, SELECTED, dBar, getVisibility, adjustBarSize,
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

  setAttribute({ x, y, style }: {x: number, y: number, style?: object}) {
    this.setState({ x, y, style });
  }

  componentDidMount() {
    const {
      arg, val, rotated, animation, scales,
    } = this.props;
    const x = arg;
    const y = val;
    if (animation) {
      this.animationId = animation(
      processPointAnimation(null, { x, y }, scales, rotated), this.setAttribute, this.animationId,
      );
    } else {
      this.setAttribute({ x, y });
    }
  }

  componentDidUpdate({
    arg: prevArg, val: prevVal, rotated: prevRotated, argument: prevArgument, value: prevValue,
  }) {
    const {
      arg, val, rotated, animation, scales,
    } = this.props;
    const x = arg;
    const y = val;
    const prevX = prevArg;
    const prevY = prevVal;
    if (animation && (prevArg !== arg || prevVal !== val || prevRotated !== rotated)) {
      this.animationId = animation(
        processPointAnimation({ x: prevX, y: prevY }, { x, y }, scales, rotated),
        this.setAttribute,
        this.animationId,
        );
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
