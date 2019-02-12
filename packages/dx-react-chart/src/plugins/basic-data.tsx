import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { defaultDomains, DataItems } from '@devexpress/dx-chart-core';

export const BasicData = ({ data }: { data: DataItems }) => (
  <Plugin name="Basis">
    <Getter name="data" value={data} />
    <Getter name="domains" value={defaultDomains} />
    <Getter name="series" value={[]} />
    <Getter name="axes" value={[]} />
    <Getter name="getAnimatedStyle" value={style => style} />
  </Plugin>
);
