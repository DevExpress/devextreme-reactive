import * as React from 'react';
import {
  processPointAnimation, HOVERED, SELECTED, dBar, getVisibility, adjustBarSize, isValuesChanged,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { BarSeries } from '../../types';

class RawBar extends React.PureComponent<BarSeries.PointProps, any> {
  animationId: any = undefined;
  isAnimationStart: any = true;
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
      arg, val, animation,
    } = this.props;
    if (!animation) {
      this.setAttribute({ x: arg, y: val });
    }
  }

  componentDidUpdate({
    arg: prevArg, val: prevVal, argument: prevArgument, value: prevValue,
  }) {
    const {
      arg, val, animation, scales, argument, value,
    } = this.props;
    if (animation && this.isAnimationStart) {
      this.animationId = animation(
        processPointAnimation(null, { x: arg, y: val }, scales),
        this.setAttribute, this.animationId,
      );
      this.isAnimationStart = false;
    } else if (animation && isValuesChanged(prevArgument, prevValue, argument, value)) {
      this.animationId = animation(
        processPointAnimation({ x: prevArg, y: prevVal }, { x: arg, y: val }, scales),
        this.setAttribute,
        this.animationId,
        );
    } else if (isValuesChanged(prevArg, prevVal, arg, val)) {
      this.setAttribute({ x: arg, y: val });
    }
  }

  render() {
    const { x, y, style: animateStyle } = this.state;
    const {
      arg, val, startVal, barWidth, maxBarWidth, animation,
      argument, value, seriesIndex, index, state, rotated,
      color, pane,
      style, scales,
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
