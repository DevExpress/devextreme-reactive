import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';

const themeComputing = ({ series }) => palette(series);

export const ThemeManager = () => (
  <Plugin name="ThemeManager">
    <Getter name="series" computed={themeComputing} />
  </Plugin>
);
