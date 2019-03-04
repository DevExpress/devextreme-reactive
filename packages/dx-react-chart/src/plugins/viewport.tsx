import * as React from 'react';
import {
  Plugin,
  Getter,
  Getters,
} from '@devexpress/dx-react-core';
import { adjustDomains } from '@devexpress/dx-chart-core';
import { ViewportProps } from '../types';

class ViewportBase extends React.PureComponent<ViewportProps> {
  render() {
    const {
      argumentBounds,
      valueBounds,
      scaleName,
    } = this.props;
    const doAdjustBounds = ({
      domains,
    }: Getters) => adjustDomains(domains, argumentBounds, scaleName, valueBounds);
    return (
      <Plugin name="viewport">
        <Getter name="domains" computed={doAdjustBounds} />
      </Plugin>
    );
  }
}

export const Viewport: React.ComponentType<ViewportProps> = ViewportBase;
