import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SearchedCell = ({
  style, column, value, children,
  tableRow, tableColumn, row, searchValue,
  ...restProps
}) => {
  const searchIndex = value.toLowerCase().search(searchValue.toLowerCase());
  const firstPart = value.slice(0, searchIndex) || '';
  const middlePart = value.slice(searchIndex, searchIndex + searchValue.length);
  const secondPart = value.slice(searchIndex + searchValue.length);
  // const result = searchValue ? ({firstPart}<mark>{searchValue}</mark>{secondPart}) : (children || value);
  return (
    <td
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: (tableColumn && tableColumn.align) || 'left',
        ...style,
      }}
      {...restProps}
    >
      {firstPart}
      <mark
        style={{
          padding: 0,
        }}
      >
        {middlePart}
      </mark>
      {secondPart}
    </td>
  );
};

SearchedCell.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.object,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

SearchedCell.defaultProps = {
  style: null,
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
