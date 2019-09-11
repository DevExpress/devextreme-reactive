import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { buildAnimation } from '@devexpress/dx-chart-core';
import { AnimationProps } from '../types';

class AnimationBase extends React.PureComponent<AnimationProps> {
  render() {
    return (
      <Plugin name="Animation">
        <Getter name="animation" value={buildAnimation} />
      </Plugin>
    );
  }
}

export const Animation: React.ComponentType<AnimationProps> = AnimationBase;
