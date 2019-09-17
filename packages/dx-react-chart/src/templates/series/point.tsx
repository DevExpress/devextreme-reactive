import * as React from 'react';
import {
  processPointAnimation, dSymbol, HOVERED, SELECTED, getVisibility,
  isValuesChanged, getStartY, UpdateAnimate,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { ScatterSeries } from '../../types';

class RawPoint extends React.PureComponent<ScatterSeries.PointProps, ScatterSeries.PointState> {
  d: string = '';
  animate: UpdateAnimate | undefined;
  constructor(props) {
    super(props);

    this.state = {
      cx: undefined,
      cy: undefined,
      style: undefined,
    };
    this.setAttribute = this.setAttribute.bind(this);
  }

  setAttribute({ x, y, style }: { x: number, y: number, style?: object }) {
    this.setState({ cx: x, cy: y, style });
  }

  componentDidMount() {
    const {
      arg, val, animation, point,
    } = this.props;

    this.d = dSymbol(point);
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
    if (animation && !this.animate) {
      this.animate = animation({ x: arg, y: getStartY(scales) }, { x: arg, y: val },
        processPointAnimation, this.setAttribute,
      );
    } else if (this.animate && isValuesChanged([prevArgument, prevValue], [argument, value])) {
      this.animate.update({ x: prevArg, y: prevVal }, { x: arg, y: val });
    } else if (isValuesChanged([prevArg, prevVal], [arg, val])) {
      this.setAttribute({ x: arg, y: val });
    }
  }

  render() {
    const { cx, cy, style: animateStyle } = this.state;
    if (cx === undefined && cy === undefined) {
      return null;
    }
    const {
      arg, val, rotated, animation,
      argument, value, seriesIndex, index, state,
      point: pointOptions,
      color, pane,
      style, scales,
      ...restProps
    } = this.props;
    const x = rotated ? cy : cx;
    const y = rotated ? cx : cy;
    const visibility = getVisibility(pane, x!, y!, 0, 0);
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
