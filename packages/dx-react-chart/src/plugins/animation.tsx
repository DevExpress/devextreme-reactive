import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { buildAnimatedStyleGetter } from '@devexpress/dx-chart-core';
import { AnimationProps } from '../types';

const getBuildAnimatedStyle = ({ rotated }: Getters) => buildAnimatedStyleGetter(rotated);

class AnimationBase extends React.PureComponent<AnimationProps> {
  render() {
    return (
      <Plugin name="Animation">
        <Getter name="getAnimatedStyle" computed={getBuildAnimatedStyle} />
      </Plugin>
    );
  }
}

export const Animation: React.ComponentType<AnimationProps> = AnimationBase;
