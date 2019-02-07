import * as React from 'react';
import { dSpline } from '@devexpress/dx-chart-core';
import { Path } from './path';

export class Spline extends React.PureComponent {
  render() {
    return <Path {...this.props} />;
  }
}

Spline.defaultProps = { path: dSpline };
