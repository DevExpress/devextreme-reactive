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
