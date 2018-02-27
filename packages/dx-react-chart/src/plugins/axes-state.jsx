import * as React from 'react';
// import * as PropTypes from 'prop-types';

import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';

const margin = 20;
const tickSize = 5;

const getAxisCoords = (scale, width, height, orientation) => {
  let getTickCoords;
  if (orientation === 'horizontal') {
    getTickCoords = (tick) => {
      const xCoords = scale(tick);
      return {
        x1: xCoords,
        x2: xCoords,
        y1: margin - tickSize,
        y2: margin + tickSize,
        text: tick,
        xText: xCoords,
        yText: 0,
      };
    };
  } else {
    getTickCoords = (tick) => {
      const yCoords = scale(tick);
      return {
        y1: yCoords,
        y2: yCoords,
        x1: margin - tickSize,
        x2: margin + tickSize,
        text: tick,
        xText: 0,
        yText: yCoords,
      };
    };
  }
  return {
    ticks: scale.ticks().map(getTickCoords),
  };
};

const computeCoords = ({ settings }) => ({
  scales, width, height, orientations,
}) =>
  settings.reduce((acc, opt) => {
    const scale = scales[opt.fieldName];
    acc[opt.fieldName] = getAxisCoords(scale, width, height, orientations[opt.fieldName]);
    return acc;
  }, {});

export const AxesState = props => (
  <Plugin name="AxesState">
    <Getter name="axesCoords" computed={computeCoords(props)} />
  </Plugin>
);
