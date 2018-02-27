import * as React from 'react';
import * as PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import { Plugin, Getter } from '@devexpress/dx-react-core';

const margin = 20;

const scalesCompted = settings => ({ data, width, height }) =>
  settings.reduce((acc, opt) => {
    const field = opt.dataField;
    const min = Math.min.apply(null, data.map(dataItem => dataItem[field]));
    const max = Math.max.apply(null, data.map(dataItem => dataItem[field]));
    let scale;

    if (opt.orientation === 'horizontal') {
      scale = scaleLinear()
        .domain([min, max])
        .range([margin, width - (2 * margin)]);
    } else {
      scale = scaleLinear()
        .domain([min, max])
        .range([margin, height - (2 * margin)]);
    }
    acc[field] = scale;
    return acc;
  }, {});

export const ScaleState = ({ settings }) => (
  <Plugin name="ScaleState">
    <Getter name="scales" computed={scalesCompted(settings)} />
  </Plugin>
);

ScaleState.propTypes = {
  settings: PropTypes.array.isRequired,
};
