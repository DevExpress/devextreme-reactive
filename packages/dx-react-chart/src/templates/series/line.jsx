import * as React from 'react';
import { dLine } from '@devexpress/dx-chart-core';
import { Path } from './path';

export class Line extends React.PureComponent {
  render() {
    return <Path {...this.props} />;
  }
}

Line.defaultProps = { path: dLine };
