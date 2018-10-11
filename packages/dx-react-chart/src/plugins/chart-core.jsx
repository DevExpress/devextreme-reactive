import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { computeDomains, buildScales } from '@devexpress/dx-chart-core';

const getDomains = ({ axes, series, data }) => computeDomains(axes, series, data);

const getScales = ({ domains, layouts, scaleExtension }) => buildScales(
  domains, scaleExtension, layouts.pane,
);

export const ChartCore = () => (
  <Plugin>
    <Getter name="domains" computed={getDomains} />
    <Getter name="scales" computed={getScales} />
  </Plugin>
);
