import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { buildAnimation, easeOut } from '@devexpress/dx-chart-core';
import { AnimationProps } from '../types';

class AnimationBase extends React.PureComponent<AnimationProps> {
  static defaultProps: Partial<AnimationProps> = {
    easing: easeOut,
    duration: 1000,
  };
  render() {
    const { easing, duration } = this.props;
    const buildAnimationGetter = () => buildAnimation(easing, duration);
    return (
      <Plugin name="Animation">
        <Getter name="animation" computed={buildAnimationGetter} />
      </Plugin>
    );
  }
}

export const Animation: React.ComponentType<AnimationProps> = AnimationBase;
