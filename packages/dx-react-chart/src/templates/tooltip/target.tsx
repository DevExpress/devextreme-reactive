import * as React from 'react';

interface TargetProps {
  x: number;
  y: number;
  d: string;
  componentRef: React.RefObject<SVGPathElement>;
}

export class Target extends React.PureComponent<TargetProps> {
  render() {
    const {
      d, x, y, componentRef,
    } = this.props;
    return (
      <path transform={`translate(${x} ${y})`} fill="none" ref={componentRef} d={d} />
    );
  }
}
