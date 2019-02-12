import * as React from 'react';
import { dLine } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { PathProps } from '../../types';

const defaultProps = {
  path: dLine,
};
export class Line extends React.PureComponent<PathProps> {
  static defaultProps = defaultProps;
  render() {
    return <Path {...this.props} />;
  }
}
