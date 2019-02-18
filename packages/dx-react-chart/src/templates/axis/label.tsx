import * as React from 'react';
import { Axis } from '../../types';

export class Label extends React.PureComponent<Axis.LabelProps> {
  render() {
    const {
      text, x, y, dominantBaseline, textAnchor, ...restProps
    } = this.props;

    return (
      <text
        dominantBaseline={dominantBaseline}
        textAnchor={textAnchor}
        x={x}
        y={y}
        {...restProps}
      >
        {text}
      </text>
    );
  }
}
