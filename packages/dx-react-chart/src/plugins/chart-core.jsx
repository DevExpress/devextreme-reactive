import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { prepareData } from '@devexpress/dx-chart-core';

const getData = ({ data, series, processingData }) => prepareData(data, series, processingData);

const getDomains = ({
  axes, series, data, computedDomain,
}) => computedDomain(axes, series, data);

const colorDomain = ({
  series, domains, argumentAxisName, items, paletteComputing,
}) => (paletteComputing(series, domains[argumentAxisName].domain, items));

export const ChartCore = () => (
  <Plugin>
    <Getter name="data" computed={getData} />
    <Getter name="domains" computed={getDomains} />
    <Getter name="colorDomain" computed={colorDomain} />
  </Plugin>
);
