import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { defaultDomains } from '@devexpress/dx-chart-core';
import { BasicDataProps } from '../types';

export const BasicData: React.SFC<BasicDataProps> = ({ data, isRotated }) => (
  <Plugin name="Basis">
    <Getter name="data" value={data} />
    <Getter name="domains" value={defaultDomains} />
    <Getter name="series" value={[]} />
    <Getter name="axes" value={[]} />
    <Getter name="getAnimatedStyle" value={style => style} />
    <Getter name="isRotated" value={isRotated} />
  </Plugin>
);
