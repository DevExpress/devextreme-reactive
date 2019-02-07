import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { buildAnimatedStyleGetter } from '@devexpress/dx-chart-core';

/* eslint-disable-next-line react/prefer-stateless-function */
export class Animation extends React.PureComponent {
  render() {
    return (
      <Plugin name="Animation">
        <Getter name="getAnimatedStyle" value={buildAnimatedStyleGetter} />
      </Plugin>
    );
  }
}
