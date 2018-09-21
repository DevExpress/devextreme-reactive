import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';

export const BasicData = ({ data }) => (
  <Plugin name="Basis">
    <Getter name="data" value={data} />
    <Getter name="series" value={[]} />
    <Getter name="argumentAxisName" value="argumentAxis" />
  </Plugin>
);

BasicData.propTypes = {
  data: PropTypes.array.isRequired,
};
