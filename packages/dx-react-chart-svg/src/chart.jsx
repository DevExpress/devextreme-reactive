import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Chart as ChartBase } from '@devexpress/dx-react-chart';

export const Chart = ({ children, ...props }) => (
  <ChartBase
    {...props}
  >
    {children}
  </ChartBase>
);

Chart.propTypes = {
  children: PropTypes.node.isRequired,
};

