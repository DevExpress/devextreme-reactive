import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getCellGeometries } from '@devexpress/dx-grid-core';

export const TableReorderingCell = ({ style, getCellDimensions }) => {
  const refHandler = node => node && getCellDimensions(() => getCellGeometries(node));
  return (
    <td
      ref={refHandler}
      style={{ ...style, padding: 0 }}
    />
  );
};

TableReorderingCell.propTypes = {
  getCellDimensions: PropTypes.func.isRequired,
  style: PropTypes.object,
};

TableReorderingCell.defaultProps = {
  style: null,
};
