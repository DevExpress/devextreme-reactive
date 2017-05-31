import React from 'react';
import PropTypes from 'prop-types';

import { DragSource } from '@devexpress/dx-react-core';

import { SortingIndicator } from './parts/sorting-indicator';

export const TableHeaderCell = ({
  style, column,
  allowSorting, sortingDirection, changeSortingDirection,
  allowGrouping, groupByColumn,
  allowDragging,
}) => {
  const align = column.align || 'left';
  const invertedAlign = align === 'left' ? 'right' : 'left';

  const gropingControl = allowGrouping && (
    <div
      onClick={(e) => {
        e.stopPropagation();
        groupByColumn(e);
      }}
      style={{
        float: invertedAlign,
        textAlign: invertedAlign,
        width: '14px',
      }}
    >
      <i
        className="glyphicon glyphicon-th-list"
        style={{
          top: '0',
          fontSize: '9px',
          margin: '-5px',
          padding: '5px',
        }}
      />
    </div>
  );

  const sortingControl = allowSorting && (
    align === 'right' ? (
      <span
        className={sortingDirection ? 'text-primary' : ''}
      >
        <SortingIndicator
          direction={sortingDirection}
          style={{ visibility: sortingDirection ? 'visible' : 'hidden' }}
        />
        &nbsp;
        {column.title}
      </span>
    ) : (
      <span
        className={sortingDirection ? 'text-primary' : ''}
      >
        {column.title}
        &nbsp;
        <SortingIndicator
          direction={sortingDirection}
          style={{ visibility: sortingDirection ? 'visible' : 'hidden' }}
        />
      </span>
    )
  );

  const cellLayout = (
    <th
      style={{
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: allowSorting && !column.type ? 'pointer' : 'default',
        ...style,
      }}
      onClick={(e) => {
        if (!allowSorting) return;
        e.stopPropagation();
        const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
        changeSortingDirection({
          keepOther: e.shiftKey || cancelSortingRelatedKey,
          cancel: cancelSortingRelatedKey,
        });
      }}
    >
      {gropingControl}
      <div
        style={{
          [`margin${column.align === 'right' ? 'Left' : 'Right'}`]: '14px',
          textAlign: align,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {allowSorting ? sortingControl : (
          column.title
        )}
      </div>
    </th>
  );

  return allowDragging ? (
    <DragSource
      getData={() => [{ type: 'column', payload: { columnName: column.name } }]}
    >
      {cellLayout}
    </DragSource>
  ) : cellLayout;
};

TableHeaderCell.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  style: PropTypes.shape(),
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  allowGrouping: PropTypes.bool,
  groupByColumn: PropTypes.func,
  allowDragging: PropTypes.bool.isRequired,
};

TableHeaderCell.defaultProps = {
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGrouping: false,
  groupByColumn: undefined,
};
