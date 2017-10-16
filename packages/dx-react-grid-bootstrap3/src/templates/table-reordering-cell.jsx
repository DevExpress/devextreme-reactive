import React from 'react';
import PropTypes from 'prop-types';

export const TableReorderingCell = ({ style, getCellDimension }) => {
  const refHandler = node => node && getCellDimension(() => {
    const { left, right } = node.getBoundingClientRect();
    return { left, right };
  });
  return (
    <td
      ref={refHandler}
      style={{ ...style, padding: 0, border: 'none' }}
    />
  );
};

TableReorderingCell.propTypes = {
  getCellDimension: PropTypes.func.isRequired,
  style: PropTypes.object,
};

TableReorderingCell.defaultProps = {
  style: {},
};
