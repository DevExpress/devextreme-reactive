import * as React from 'react';
import { ChartLabelProps } from '../types';

export class Label extends React.PureComponent<ChartLabelProps> {
  render() {
    return (
      <text {...this.props} />
    );
  }
}
