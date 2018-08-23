import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';

const themeComputing = ({ series }) => palette(series);
const pieThemeComputing = ({
  domains,
  argumentAxisName,
}) => palette(domains[argumentAxisName].domain.map(uniqueName => ({ uniqueName })));


export const ThemeManager = () => (
  <Plugin name="ThemeManager">
    <Getter name="colorDomain" computed={themeComputing} />
    <Getter name="pieColorDomain" computed={pieThemeComputing} />
  </Plugin>
);
