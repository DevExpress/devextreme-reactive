import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableReorderingCell = ({ style, getCellDimensions }) => {
  const refHandler = node => node && getCellDimensions(() => {
    const { left, right } = node.getBoundingClientRect();
    return { left, right };
  });
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
