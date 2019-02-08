import * as React from 'react';
import { dLine } from '@devexpress/dx-chart-core';
import { Path } from './path';

const defaultProps = {
  path: dLine,
};
type LineProps = Readonly<typeof defaultProps>;
export class Line extends React.PureComponent<LineProps> {
  static defaultProps = defaultProps;
  render() {
    return <Path {...this.props} />;
  }
}
