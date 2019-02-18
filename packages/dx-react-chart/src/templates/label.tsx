import * as React from 'react';
import { Chart } from '../types';

export class Label extends React.PureComponent<Chart.LabelProps> {
  render() {
    return (
      <text {...this.props} />
    );
  }
}
