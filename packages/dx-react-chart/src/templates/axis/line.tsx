import * as React from 'react';

type LineProps = {
  x1: number,
  x2: number,
  y1: number,
  y2: number,
};

export class Line extends React.PureComponent<LineProps> {
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
