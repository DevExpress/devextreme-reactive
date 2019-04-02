import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { buildAnimatedStyleGetter } from '@devexpress/dx-chart-core';
import { AnimationProps } from '../types';

class AnimationBase extends React.PureComponent<AnimationProps> {
  render() {
    return (
      <Plugin name="Animation">
        <Getter name="getAnimatedStyle" value={buildAnimatedStyleGetter} />
      </Plugin>
    );
  }
}

export const Animation: React.ComponentType<AnimationProps> = AnimationBase;
