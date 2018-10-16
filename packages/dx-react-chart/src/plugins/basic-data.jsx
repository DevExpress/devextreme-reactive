import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { getSeriesPoints } from '@devexpress/dx-chart-core';

export const BasicData = ({ data }) => (
  <Plugin name="Basis">
    <Getter name="data" value={data} />
    <Getter name="series" value={[]} />
    <Getter name="axes" value={[]} />
    <Getter name="getSeriesPoints" value={getSeriesPoints} />
  </Plugin>
);

BasicData.propTypes = {
  data: PropTypes.array.isRequired,
};
