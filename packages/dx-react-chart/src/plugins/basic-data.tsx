import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { defaultDomains } from '@devexpress/dx-chart-core';
import { BasicDataProps } from '../types';

const series = [];

export const BasicData: React.FunctionComponent<BasicDataProps> = ({ data, rotated }) => (
  <Plugin name="Basis">
    <Getter name="data" value={data} />
    <Getter name="domains" value={defaultDomains} />
    <Getter name="series" value={series} />
    <Getter name="rotated" value={rotated} />
  </Plugin>
);
