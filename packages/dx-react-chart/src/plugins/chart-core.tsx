import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { computeDomains, buildScales, scaleSeriesPoints } from '@devexpress/dx-chart-core';

const getDomains = ({ domains, series }) => computeDomains(domains, series);

const getScales = ({ domains, layouts }) => buildScales(domains, layouts.pane);

const getSeries = ({ series, scales }) => scaleSeriesPoints(series, scales);

export const ChartCore = () => (
  <Plugin>
    <Getter name="domains" computed={getDomains} />
    <Getter name="scales" computed={getScales} />
    <Getter name="series" computed={getSeries} />
  </Plugin>
);
