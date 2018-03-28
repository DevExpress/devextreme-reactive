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
  const searchingContent = () => (
    <React.Fragment>
      {firstPart}
      <mark
        style={{
          padding: 0,
        }}
      >
        {middlePart}
      </mark>
      {secondPart}
    </React.Fragment>
  );

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
      {children || searchingContent()}
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
  searchValue: PropTypes.object,
};

SearchedCell.defaultProps = {
  style: null,
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  searchValue: '',
};
