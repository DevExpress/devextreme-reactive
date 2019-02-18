import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { buildAnimatedStyleGetter } from '@devexpress/dx-chart-core';
import { AnimationProps } from '../types';

/** @internal */
export class Animation extends React.PureComponent<AnimationProps> {
  render() {
    return (
      <Plugin name="Animation">
        <Getter name="getAnimatedStyle" value={buildAnimatedStyleGetter} />
      </Plugin>
    );
  }
}
