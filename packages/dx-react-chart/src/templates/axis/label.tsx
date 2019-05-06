import * as React from 'react';
import { Axis } from '../../types';

export class Label extends React.PureComponent<Axis.LabelProps> {
  render() {
    const {
      text, ...restProps
    } = this.props;

    return (
      <text
        {...restProps}
      >
        {text}
      </text>
    );
  }
}
