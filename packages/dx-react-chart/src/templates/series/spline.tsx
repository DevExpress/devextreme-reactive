import * as React from 'react';
import { dSpline } from '@devexpress/dx-chart-core';
import { Path } from './path';

export class Spline extends React.PureComponent {
  static defaultProps = { path: dSpline };
  render() {
    return <Path {...this.props} />;
  }
}
