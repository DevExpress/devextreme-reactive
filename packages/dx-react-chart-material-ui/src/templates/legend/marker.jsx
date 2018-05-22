import * as React from 'react';

export const Marker = props => (
  <svg width="10" height="10" {...props}>
    <circle r={5} cx={5} cy={5} />
  </svg>);
