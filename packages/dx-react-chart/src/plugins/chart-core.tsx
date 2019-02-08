import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { computeDomains, buildScales, scaleSeriesPoints } from '@devexpress/dx-chart-core';

const getDomains = ({ domains, series }: Getters) => computeDomains(domains, series);

const getScales = ({ domains, layouts }: Getters) => buildScales(domains, layouts.pane);

const getSeries = ({ series, scales }: Getters) => scaleSeriesPoints(series, scales);

export const ChartCore = () => (
  <Plugin>
    <Getter name="domains" computed={getDomains} />
    <Getter name="scales" computed={getScales} />
    <Getter name="series" computed={getSeries} />
  </Plugin>
);
