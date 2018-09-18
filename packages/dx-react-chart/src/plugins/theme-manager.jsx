import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';

const themeComputing = ({
  series, domains, argumentAxisName, items,
}) => palette(items(series, domains[argumentAxisName].domain));


export const ThemeManager = () => (
  <Plugin name="ThemeManager">
    <Getter name="colorDomain" computed={themeComputing} />
  </Plugin>
);
