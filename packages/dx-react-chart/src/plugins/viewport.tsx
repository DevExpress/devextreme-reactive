import * as React from 'react';
import {
  Plugin,
  Getter,
  Getters,
} from '@devexpress/dx-react-core';
import { adjustLayout } from '@devexpress/dx-chart-core';
import { ViewportProps } from '../types';

class ViewportBase extends React.PureComponent<ViewportProps> {
  render() {
    const {
      argumentBounds,
      valueBounds,
      scaleName,
    } = this.props;
    const doAdjustLayout = ({
      domains,
      ranges,
    }: Getters) => adjustLayout(domains, ranges, { argumentBounds, scaleName, valueBounds });
    return (
      <Plugin name="viewport">
        <Getter name="ranges" computed={doAdjustLayout} />
      </Plugin>
    );
  }
}

export const Viewport: React.ComponentType<ViewportProps> = ViewportBase;
