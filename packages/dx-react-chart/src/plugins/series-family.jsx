import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { processData, seriesWithStacks, stacks } from '@devexpress/dx-chart-core';

const computedSeries = ({ series }) => seriesWithStacks(series);
const computedStacks = ({ series }) => stacks(series);
const computedData = ({ series, data }) => processData(series, data);

export const SeriesFamily = () => (
  <Plugin name="SeriesFamily">
    <Getter name="series" computed={computedSeries} />
    <Getter name="data" computed={computedData} />
    <Getter name="stacks" computed={computedStacks} />
  </Plugin>
);
