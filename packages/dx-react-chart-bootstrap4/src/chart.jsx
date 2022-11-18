import * as React from 'react';
import PropTypes from 'prop-types';
import { withComponents } from '@devexpress/dx-react-core';
import { Chart as ChartBase, Palette } from '@devexpress/dx-react-chart';
import { Root } from './templates/layout';
import { Label } from './templates/label';

const palette = ['#0070ff', '#d72e3d', '#249d3d', '#ffb90c', '#1698af', '#616a72'];

const ChartWithPalette = ({ children, ...props }) => (
  <ChartBase
    {...props}
  >
    <Palette scheme={palette} />
    {children}
  </ChartBase>
);

ChartWithPalette.components = ChartBase.components;

ChartWithPalette.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Chart = withComponents({ Root })(ChartWithPalette);
Chart.Label = Label;
