import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { domains } from '@devexpress/dx-chart-core';

const computedDomain = ({
  axes, series, data, argumentAxisName,
}) => domains(axes, series, data, argumentAxisName);

export const IntegratedScaleProcessing = () => ((
  <Plugin name="IntegratedScaleProcessing">
    <Getter name="domains" computed={computedDomain} />
  </Plugin>
));
