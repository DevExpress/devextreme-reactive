import * as React from 'react';
import { Animation, isScalesChanged } from '@devexpress/dx-chart-core';

export const withAnimation = (
    processAnimation: any, getProps: any,
    getStartCoordinates: any, isValuesChanged: any, getDelay?: any,
) => (Component: React.ComponentType<any>) => {
  class ComponentWithAnimation extends React.PureComponent<any, any> {
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
        animation, scales, index,
      } = this.props;

      const props = getProps(this.props);
      if (!animation) {
        this.setAttribute(props);
      } else {
        this.animate = animation(
          getStartCoordinates(scales, props), props,
          processAnimation, this.setAttribute, getDelay && getDelay(index, true),
        );
      }
    }

    componentDidUpdate({
      scales: prevScales, ...prevProps
    }) {
      const {
        scales, index,
      } = this.props;
      const props = getProps(this.props);
      const neededPrevProps = getProps(prevProps);
      if (this.animate) {
        if (isScalesChanged(prevScales, scales)) {
          this.setAttribute(props);
        } else if (isValuesChanged(neededPrevProps, props)) {
          const delay = getDelay ? getDelay(index, false) : 0;
          this.animate.update(neededPrevProps, props, delay);
        }
      } else {
        this.setAttribute(props);
      }
    }

    componentWillUnmount() {
      return this.animate && this.animate.stop();
    }

    render() {
      if (!this.state) {
        return null;
      }
      return (
        <Component {...this.props} {...this.state} />
      );
    }
  }
  return ComponentWithAnimation;
};
