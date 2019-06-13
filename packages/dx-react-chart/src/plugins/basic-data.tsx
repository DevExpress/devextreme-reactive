import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { defaultDomains } from '@devexpress/dx-chart-core';
import { BasicDataProps } from '../types';

const series = [];
const axes = [];
const getAnimatedStyle = (style: object) => style;

export const BasicData: React.SFC<BasicDataProps> = ({ data, isRotated }) => (
  <Plugin name="Basis">
    <Getter name="data" value={data} />
    <Getter name="domains" value={defaultDomains} />
    <Getter name="series" value={series} />
    <Getter name="axes" value={axes} />
    <Getter name="getAnimatedStyle" value={getAnimatedStyle} />
    <Getter name="isRotated" value={isRotated} />
  </Plugin>
);
