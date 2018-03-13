import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { calculateDomain } from '@devexpress/dx-chart-core';

export const IntegratedScaleProcessing = () => {
  const computedDomain = ({
    axes, series, data, argumentAxisName,
  }) => calculateDomain(axes, series, data, argumentAxisName);
  return ((
    <Plugin name="IntegratedScaleProcessing">
      <Getter name="domains" computed={computedDomain} />
    </Plugin>));
};
