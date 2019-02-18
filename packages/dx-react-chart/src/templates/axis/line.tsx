import * as React from 'react';
import { Axis } from '../../types';

export class Line extends React.PureComponent<Axis.LineProps> {
  render() {
    const {
      x1, x2, y1, y2, ...restProps
    } = this.props;
    return (
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        {...restProps}
      />
    );
  }
}
