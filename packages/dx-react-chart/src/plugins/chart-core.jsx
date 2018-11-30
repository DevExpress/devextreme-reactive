import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { computeDomains, buildScales, scaleSeriesPoints } from '@devexpress/dx-chart-core';

const getDomains = ({ axes, series }) => computeDomains(axes, series);

const getScales = ({ domains, layouts, scaleExtension }) => buildScales(
  domains, scaleExtension, layouts.pane,
);

const getSeries = ({
  series,
  scales,
  // TODO: The following are BarSeries specifics - remove them.
  stacks,
  scaleExtension,
}) => scaleSeriesPoints(series, scales, stacks, scaleExtension);

export const ChartCore = () => (
  <Plugin>
    <Getter name="domains" computed={getDomains} />
    <Getter name="scales" computed={getScales} />
    <Getter name="series" computed={getSeries} />
  </Plugin>
);
