import * as React from 'react';
import {
  dPie, HOVERED, SELECTED, processPieAnimation, isValuesChanged, getDelay, Animation,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { PieSeries, PieSeriesState } from '../../types';

class RawSlice extends React.PureComponent<PieSeries.PointProps, PieSeriesState> {
  animate: Animation | undefined = undefined;
  constructor(props) {
    super(props);

    this.state = {
      innerRadius: 0,
      outerRadius: 0,
      startAngle: 0,
      endAngle: 0,
      style: undefined,
    };
    this.setAttribute = this.setAttribute.bind(this);
  }

  setAttribute({ innerRadius, outerRadius, startAngle, endAngle, style }:
    {
      innerRadius: number,
      outerRadius: number,
      startAngle: number,
      endAngle: number,
      style?: object,
    }) {
    this.setState({ innerRadius, outerRadius, style, startAngle, endAngle });
  }

  componentDidMount() {
    const {
      innerRadius, outerRadius, startAngle, endAngle, animation, index,
    } = this.props;
    if (animation) {
      this.animate = animation(
        { innerRadius: 0, outerRadius: 0, startAngle, endAngle },
        { innerRadius, outerRadius, startAngle, endAngle },
        processPieAnimation, this.setAttribute, getDelay(index, true),
      );
    } else {
      this.setAttribute({ innerRadius, outerRadius, startAngle, endAngle });
    }
  }

  componentDidUpdate({
    startAngle: prevStartAngle, endAngle: prevEndAngle,
    innerRadius: prevInnerRadius, outerRadius: prevOuterRadius,
  }) {
    const {
      innerRadius, outerRadius, startAngle, endAngle, index,
    } = this.props;
    if (this.animate) {
      if (isValuesChanged([
        prevStartAngle, prevEndAngle, prevInnerRadius, prevOuterRadius,
      ], [
        startAngle, endAngle, innerRadius, outerRadius,
      ])) {
        this.animate.update(
        { innerRadius, outerRadius, startAngle: prevStartAngle, endAngle: prevEndAngle },
        { innerRadius, outerRadius, startAngle, endAngle }, getDelay(index, false));
      }
    } else {
      this.setAttribute({ innerRadius, outerRadius, startAngle, endAngle });
    }
  }

  componentWillUnmount() {
    return this.animate && this.animate.stop();
  }

  render() {
    const {
      innerRadius: innerRadiusState,
      outerRadius: outerRadiusState,
      startAngle: startAngleState,
      endAngle: endAngleState,
      style: animateStyle,
    } = this.state;
    const {
      arg, val, rotated,
      argument, value, seriesIndex, index, state, maxRadius,
      innerRadius, outerRadius, startAngle, endAngle,
      color, animation, pane,
      style, scales,
      ...restProps
    } = this.props;
    return (
      <g transform={`translate(${arg} ${val})`}>
        <path
          d={dPie(maxRadius, innerRadiusState!, outerRadiusState!,
            startAngleState!, endAngleState!)}
          fill={color}
          stroke="none"
          style={{ ...style, ...animateStyle }}
          {...restProps}
        />
      </g>
    );
  }
}

// It should actually be `withPattern<PieSeries.PointProps>` but `opacity` is not decleared there.
// It is not clear if `opacity` should be explicitly enumerated or stay as part of `restProps`.

export const Slice: React.ComponentType<PieSeries.PointProps> = withStates({
  [HOVERED]: withPattern<any>(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawSlice),
  [SELECTED]: withPattern<any>(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawSlice),
})(RawSlice);
