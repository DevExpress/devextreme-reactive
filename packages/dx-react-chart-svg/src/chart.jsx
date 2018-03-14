import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Chart as ChartBase } from '@devexpress/dx-react-chart';
import { Root } from './templates/layout';

export const Chart = ({ children, ...restProps }) => (
  <ChartBase
    rootComponent={Root}
    {...restProps}
  >
    {children}
  </ChartBase>
);

Chart.propTypes = {
  children: PropTypes.node.isRequired,
};
