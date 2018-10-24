import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Chart as ChartBase, withComponents, Palette,
} from '@devexpress/dx-react-chart';
import { Root } from './templates/layout';
import { Label } from './templates/label';

const palette = ['#40C4FF', '#FF5252', '#00C853', '#FFEB3B', '#FF4081', '#E040FB'];

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
