import React from 'react';
import PropTypes from 'prop-types';

import { DragSource } from '@devexpress/dx-react-core';

import { SortingIndicator } from './parts/sorting-indicator';

export const TableHeaderCell = ({
  style, column,
  allowSorting, sortingDirection, changeSortingDirection,
  allowGrouping, groupByColumn,
  allowDragging, dragPayload,
}) => {
  const align = column.align || 'left';
  const invertedAlign = align === 'left' ? 'right' : 'left';
  const columnTitle = column.title || column.name;

  const groupingControl = allowGrouping && (
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
        {columnTitle}
      </span>
    ) : (
      <span
        className={sortingDirection ? 'text-primary' : ''}
      >
        {columnTitle}
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
      {groupingControl}
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
          columnTitle
        )}
      </div>
    </th>
  );

  return allowDragging ? (
    <DragSource getPayload={() => dragPayload}>
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
  allowDragging: PropTypes.bool,
  dragPayload: PropTypes.any,
};

TableHeaderCell.defaultProps = {
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGrouping: false,
  groupByColumn: undefined,
  allowDragging: false,
  dragPayload: null,
};
