import * as React from 'react';
import {
  dPie, HOVERED, SELECTED, processPieAnimation, isValuesChanged,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { PieSeries } from '../../types';

class RawSlice extends React.PureComponent<PieSeries.PointProps, any> {
  animationId: any = undefined;
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
      innerRadius, outerRadius, startAngle, endAngle, animation,
    } = this.props;
    if (animation) {
      this.animationId = animation(
        processPieAnimation({
          innerRadius: 0, outerRadius: 0, startAngle, endAngle,
        }, { innerRadius, outerRadius, startAngle, endAngle }),
        this.setAttribute, this.animationId,
      );
    } else {
      this.setAttribute({ innerRadius, outerRadius, startAngle, endAngle });
    }
  }

  componentDidUpdate({
    startAngle: prevStartAngle, endAngle: prevEndAngle,
    argument: prevArgument, value: prevValue,
  }) {
    const {
      innerRadius, outerRadius, argument, value, animation, startAngle, endAngle,
    } = this.props;
    if (animation && isValuesChanged(prevArgument, prevValue, argument, value)) {
      this.animationId = animation(
        processPieAnimation(
          { innerRadius, outerRadius, startAngle: prevStartAngle, endAngle: prevEndAngle },
          { innerRadius, outerRadius, startAngle, endAngle },
        ),
        this.setAttribute,
        this.animationId,
        );
    }
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
      color, animation,
      style, scales,
      ...restProps
    } = this.props;
    return (
      <g transform={`translate(${arg} ${val})`}>
        <path
          d={dPie(maxRadius, innerRadiusState, outerRadiusState, startAngleState, endAngleState)}
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
