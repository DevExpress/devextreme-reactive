import * as React from 'react';
// import * as PropTypes from 'prop-types';

import { Plugin, Getter } from '@devexpress/dx-react-core';

const computeLinePath = ({ settings }) => ({
  data, scales,
}) => settings.reduce((acc, setting) => {
  const { argumentField, valueField } = setting;
  acc[argumentField] = data.map(d => ({
    x: scales[argumentField](d[argumentField]),
    y: scales[valueField](d[valueField]),
  }));
  return acc;
}, {});

export const SeriesState = props => (
  <Plugin name="SeriesState">
    <Getter name="linePath" computed={computeLinePath(props)} />
  </Plugin>
);
