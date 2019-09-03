import * as React from 'react';
import {
  dSymbol, HOVERED, SELECTED, getVisibility,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { ScatterSeries } from '../../types';

class RawPoint extends React.PureComponent<ScatterSeries.PointProps, any> {
  d: string = '';
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

  componentDidMount() {
    const {
      point,
    } = this.props;

    this.d = dSymbol(point);
  }

  componentDidUpdate({
    arg: prevArg, val: prevVal, rotated: prevRotated, argument: prevArgument, value: prevValue,
  }) {
    const {
      arg, val, rotated, animation, scales, argument, value,
    } = this.props;
    const x = rotated ? val : arg;
    const y = rotated ? arg : val;
    const prevX = rotated ? prevVal : prevArg;
    const prevY = rotated ? prevArg : prevVal;
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
      arg, val, rotated, animation,
      argument, value, seriesIndex, index, state,
      point: pointOptions,
      color, pane,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    const visibility = getVisibility(pane, x, y, 0, 0);
    return (
      <path
        transform={`translate(${x} ${y})`}
        d={this.d}
        fill={color}
        visibility={visibility}
        stroke="none"
        style={{ ...style, ...animateStyle }}
        {...restProps}
      />
    );
  }
}

// The expression is used to have 12 from 7 in default scenario
// and to adjust hovered or selected size when custom *point.size* is defined.
const getAdjustedOptions = ({ size }) => ({ size: Math.round(size * 1.7) });

export const Point: React.ComponentType<ScatterSeries.PointProps> = withStates({
  [HOVERED]: ({ color, point, ...restProps }) => ({
    stroke: color,
    strokeWidth: 4,
    fill: 'none',
    point: getAdjustedOptions(point),
    ...restProps,
  }),
  [SELECTED]: ({ color, point, ...restProps }) => ({
    stroke: color,
    strokeWidth: 4,
    fill: 'none',
    point: getAdjustedOptions(point),
    ...restProps,
  }),
})(RawPoint);
