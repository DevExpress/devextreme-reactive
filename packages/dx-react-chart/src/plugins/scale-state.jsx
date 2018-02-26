import * as React from 'react';
import * as PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

import { Plugin, Getter } from '@devexpress/dx-react-core';

const margin = 20;
const tickSize = 5;

const path = settings => ({ data, width, height }) =>
  settings.reduce((acc, item) => {
    const field = item.dataField;
    const min = Math.min.apply(null, data.map(dataItem => dataItem[field]));
    const max = Math.max.apply(null, data.map(dataItem => dataItem[field]));
    if (item.orientation === 'horizontal') {
      const scale = scaleLinear()
        .domain([min, max])
        .range([margin, width - (2 * margin)]);
      acc[field] = data.map(dataItem => ({
        x: scale(dataItem[field]),
        text: dataItem[field],
        y: margin,
        x1: scale(dataItem[field]),
        x2: scale(dataItem[field]),
        y1: margin - tickSize,
        y2: margin + tickSize,
      }));
    } else {
      const scale = scaleLinear()
        .domain([min, max])
        .range([margin, height - (2 * margin)]);
      acc[field] = data.map(dataItem => ({
        y: scale(dataItem[field]),
        text: dataItem[field],
        x: margin,
        y1: scale(dataItem[field]),
        y2: scale(dataItem[field]),
        x1: margin - tickSize,
        x2: margin + tickSize,
      }));
    }
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
  const pathComputed = path(settings);
  const lineComputed = createLine(
    settings.find(d => d.isArgumentField),
    settings.find(d => d.isValueField),
  );

  return (
    <Plugin name="ScaleState">
      <Getter name="path" computed={pathComputed} />
      <Getter name="dAttr" computed={lineComputed} />
    </Plugin>
  );
};

ScaleState.propTypes = {
  settings: PropTypes.array.isRequired,
};
