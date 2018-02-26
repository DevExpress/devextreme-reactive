import * as React from 'react';
import { scaleLinear } from 'd3-scale';

import {
  Plugin, Getter,
} from '@devexpress/dx-react-core';

const path = settings => ({ data }) =>
  settings.reduce((acc, item) => {
    const field = item.dataField;
    const min = data[0][field];
    const max = data[data.length - 1][field];
    const scale = scaleLinear().domain([min, max]).range([0, 400]);
    acc[field] = data.map(dataItem => ({ x: scale(dataItem[field]), text: dataItem[field] }));
    return acc;
  }, {});

export const ScaleState = ({ settings }) => {
  const pathComputed = path(settings);

  return ((
    <Plugin
      name="ScaleState"
    >
      <Getter name="path" computed={pathComputed} />
    </Plugin>));
};
