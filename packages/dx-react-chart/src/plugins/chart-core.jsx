import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { ARGUMENT_DOMAIN } from '@devexpress/dx-chart-core';

const getDomains = ({
  axes, series, data, computeDomains,
}) => computeDomains(axes, series, data);

const colorDomain = ({
  series, domains, items, paletteComputing,
}) => paletteComputing(series, domains[ARGUMENT_DOMAIN].domain, items);

export const ChartCore = () => (
  <Plugin>
    <Getter name="domains" computed={getDomains} />
    <Getter name="colorDomain" computed={colorDomain} />
  </Plugin>
);
