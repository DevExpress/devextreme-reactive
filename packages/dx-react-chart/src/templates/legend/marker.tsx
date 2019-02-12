import * as React from 'react';
import { MarkerProps } from '../../types';

export class Marker extends React.PureComponent<MarkerProps> {
  render() {
    const { color, ...restProps } = this.props;
    return (
      <svg fill={color} width="10" height="10" {...restProps}>
        <circle r={5} cx={5} cy={5} {...restProps} />
      </svg>
    );
  }
}
