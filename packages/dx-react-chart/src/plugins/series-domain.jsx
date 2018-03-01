import * as React from 'react';

import { Plugin, Getter } from '@devexpress/dx-react-core';
import { extent } from 'd3-array';

const domainComputed = ({
  series, data, domains, argumentAxisName,
}) =>
  Object.assign(
    {},
    domains,
    series.reduce((acc, seriesOption) => {
      const { valueField, argumentField, axisName } = seriesOption;
      const valueDomain = extent(data, item => item[valueField]);
      const argumentDomain = extent(data, item => item[argumentField]);
      acc[axisName] = acc[axisName]
        ? extent(acc[axisName].concat(valueDomain))
        : valueDomain;
      acc[argumentAxisName] = acc[argumentAxisName]
        ? extent(acc[argumentAxisName].concat(argumentDomain))
        : argumentDomain;
      return acc;
    }, {}),
  );

export const SeriesDomain = () => (
  <Plugin name="SeriesDomain">
    <Getter name="domains" computed={domainComputed} />
  </Plugin>
);
