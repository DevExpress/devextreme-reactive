import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { ChartCore } from './plugins/chart-core';

export const Chart = ({
  data,
  width,
  height,
  children,
  ...restProps
}) => (
  <PluginHost>
    <ChartCore
      data={data}
      width={width}
      height={height}
      {...restProps}
    />
    {children}
  </PluginHost>
);

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};

Chart.defaultProps = {
  width: '150',
  height: '150',
  children: null,
};

