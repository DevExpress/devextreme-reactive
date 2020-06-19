import * as React from 'react';
import { Animation, isScalesChanged } from '@devexpress/dx-chart-core';
import { GetDelayFn, Scales, AnimatedComponent } from '../types';

export const withAnimation = <T extends AnimatedComponent>(
    processAnimation: (start: T, end: T) => (progress: number) => any, getProps: (props: T) => any,
    getStartCoordinates: (scales: Scales, props: T) => any,
    isValuesChanged: (previous: T, current: T) => boolean,
    getDelay?: GetDelayFn,
) => (Component: React.ComponentType<T>): React.ComponentType<T> => {
  class ComponentWithAnimation extends React.PureComponent<T, T> {
    animate: Animation | undefined;
    constructor(props) {
      super(props);

      this.setAttribute = this.setAttribute.bind(this);
    }

    setAttribute(state) {
      this.setState(state);
    }

    componentDidMount() {
      const {
        animation, scales, index, readyToRenderSeries,
      } = this.props;
      if (!readyToRenderSeries) {
        return;
      }
      const props = getProps(this.props);
      this.processComponent(animation, { scales: {} }, scales, props, {}, index);
    }

    componentDidUpdate(prevProps) {
      const {
        scales, index, animation, readyToRenderSeries,
      } = this.props;
      if (!readyToRenderSeries) {
        return;
      }
      this.processComponent(
        animation, prevProps, scales, getProps(this.props),
        getProps(prevProps), index,
      );
    }

    processComponent(animation, { scales: prevScales }, scales, props, prevProps, index) {
      if (!animation) {
        this.setAttribute(props);
      } else if (this.animate) {
        if (isScalesChanged(prevScales, scales)) {
          this.setAttribute(props);
        } else if (isValuesChanged(prevProps, props)) {
          const delay = getDelay ? getDelay(index, false) : 0;
          this.animate.update(prevProps, props, delay);
        }
      } else {
        this.animate = animation(
          getStartCoordinates(scales, props), props,
          processAnimation, this.setAttribute, getDelay && getDelay(index, true),
        );
      }
    }

    componentWillUnmount() {
      return this.animate && this.animate.stop();
    }

    render() {
      const { readyToRenderSeries, ...restProps } = this.props;
      if (!this.state) {
        return null;
      }
      return (
        <Component {...restProps} {...this.state} />
      );
    }
  }
  return ComponentWithAnimation;
};
