import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Chart as ChartBase, withComponents, Palette } from '@devexpress/dx-react-chart';
import { Root } from './templates/layout';

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
