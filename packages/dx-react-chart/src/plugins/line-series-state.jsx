import * as React from 'react';
// import * as PropTypes from 'prop-types';

import { Plugin, Getter } from '@devexpress/dx-react-core';

const computeLinePath = ({ settings }) => ({
  data, scales,
}) => {
  const { argumentField, valueField } = settings;
  debugger
  return data.map(d => ({
    x: scales[argumentField](d[argumentField]),
    y: scales[valueField](d[valueField]),
  }));
};

export const LineSeriesState = props => (
  <Plugin name="LineSeriesState">
    <Getter name="linePath" computed={computeLinePath(props)} />
  </Plugin>
);
