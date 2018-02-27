import * as React from 'react';
import * as PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

import { Plugin, Getter } from '@devexpress/dx-react-core';

const margin = 20;

const scalesCompted = settings => ({ data }) =>
  settings.reduce((acc, opt) => {
    const field = opt.dataField;
    const min = Math.min.apply(null, data.map(dataItem => dataItem[field]));
    const max = Math.max.apply(null, data.map(dataItem => dataItem[field]));
    acc[field] = scaleLinear()
      .domain([min, max]);
    return acc;
  }, {});


const createLine = ({ dataField: fieldX }, { dataField: fieldY }) => ({ data, width, height }) => {
  const minX = Math.min.apply(null, data.map(dataItem => dataItem[fieldX]));
  const maxX = Math.max.apply(null, data.map(dataItem => dataItem[fieldX]));
  const minY = Math.min.apply(null, data.map(dataItem => dataItem[fieldY]));
  const maxY = Math.max.apply(null, data.map(dataItem => dataItem[fieldY]));
  const scaleX = scaleLinear()
    .domain([minX, maxX])
    .range([margin, width - (2 * margin)]);

  const scaleY = scaleLinear()
    .domain([minY, maxY])
    .range([margin, height - (2 * margin)]);

  return line()
    .x(d => scaleX(d[fieldX]))
    .y(d => scaleY(d[fieldY]))(data);
};

export const ScaleState = ({ settings }) => {
  const lineComputed = createLine(
    settings.find(d => d.isArgumentField),
    settings.find(d => d.isValueField),
  );

  return (
    <Plugin name="ScaleState">
      <Getter name="dAttr" computed={lineComputed} />
      <Getter name="scales" computed={scalesCompted(settings)} />
    </Plugin>
  );
};

ScaleState.propTypes = {
  settings: PropTypes.array.isRequired,
};
