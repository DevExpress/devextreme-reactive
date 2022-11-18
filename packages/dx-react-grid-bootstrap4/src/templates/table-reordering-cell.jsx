import * as React from 'react';
import PropTypes from 'prop-types';
import { getCellGeometries } from '@devexpress/dx-grid-core';

export const TableReorderingCell = ({ style, getCellDimensions }) => {
  const refHandler = node => node && getCellDimensions(() => getCellGeometries(node));
  return (
    <td
      ref={refHandler}
      className="p-0 border-0"
      style={style}
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
