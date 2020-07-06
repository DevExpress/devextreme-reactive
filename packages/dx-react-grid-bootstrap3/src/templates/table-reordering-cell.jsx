import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableReorderingCell = ({ style, getCellDimensions }) => {
  const refHandler = node => node && getCellDimensions(() => {
    const { left, right, width } = node.getBoundingClientRect();
    const styleLeft = node.style.left?.replace('px', '');
    const styleRight = node.style.right?.replace('px', '');

    if (styleLeft) {
      const calculatedLeft = Math.max(styleLeft, left);
      return {
        left: calculatedLeft,
        right: calculatedLeft + width,
        isFixed: true,
      };
    }

    if (styleRight) {
      // NOTE: get tableContainer (parent of first DIV element) to calculate 'right' value
      let tableContainer = node;
      while (tableContainer && tableContainer.nodeName !== 'DIV') {
        tableContainer = tableContainer.parentNode;
      }
      tableContainer = tableContainer?.parentNode;

      if (tableContainer) {
        const { width: tableWidth } = tableContainer.getBoundingClientRect();
        const calculatedRight = Math.min(tableWidth - styleRight, right);
        return {
          left: calculatedRight - width,
          right: calculatedRight,
          isFixed: true,
        };
      }
    }

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
  getCellDimensions: PropTypes.func.isRequired,
  style: PropTypes.object,
};

TableReorderingCell.defaultProps = {
  style: null,
};
