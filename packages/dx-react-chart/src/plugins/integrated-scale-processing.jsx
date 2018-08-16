import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { domains } from '@devexpress/dx-chart-core';

const computedDomain = ({
  axes, series, data, argumentAxisName, startFromZero,
}) => domains(axes, series, data, argumentAxisName, startFromZero);

export const IntegratedScaleProcessing = () => ((
  <Plugin name="IntegratedScaleProcessing">
    <Getter name="domains" computed={computedDomain} />
  </Plugin>
));
