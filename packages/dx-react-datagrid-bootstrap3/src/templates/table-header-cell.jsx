import React from 'react';

export const TableHeaderCell = ({
  style, column,
  sortingEnabled, sortDirection, changeSortDirection,
  groupingEnabled, groupByColumn,
}) => {
  const iconName = `glyphicon-arrow-${sortDirection === 'asc' ? 'down' : 'up'}`;
  const groupingFloat = column.align === 'right' ? 'left' : 'right';
  const titleFloat = column.align === 'right' ? 'right' : 'none';
  return (
    <th
      style={{
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: !column.type && 'pointer',
        ...style,
      }}
      onClick={(e) => {
        if (!sortingEnabled) return;
        e.stopPropagation();
        changeSortDirection({ keepOther: e.shiftKey });
      }}
    >
      {groupingEnabled && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            groupByColumn(e);
          }}
          style={{
            float: groupingFloat,
            textAlign: groupingFloat,
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
      )}
      {sortingEnabled ? (
        <span
          className={sortDirection ? 'text-primary' : ''}
          style={{
            float: titleFloat,
            whiteSpace: 'nowrap',
          }}
        >
          {column.title}
          &nbsp;
          <i
            className={`glyphicon ${iconName}`}
            style={{
              visibility: sortDirection ? 'visible' : 'hidden',
              top: '0',
              float: titleFloat,
              fontSize: '9px',
            }}
          />
        </span>
      ) : (
        column.title
      )}
    </th>
  );
};
TableHeaderCell.defaultProps = {
  style: null,
  sortingEnabled: false,
  sortDirection: undefined,
  changeSortDirection: undefined,
  groupingEnabled: false,
  groupByColumn: undefined,
};
TableHeaderCell.propTypes = {
  column: React.PropTypes.shape({
    title: React.PropTypes.string,
  }).isRequired,
  style: React.PropTypes.shape(),
  sortingEnabled: React.PropTypes.bool,
  sortDirection: React.PropTypes.oneOf(['asc', 'desc', null]),
  changeSortDirection: React.PropTypes.func,
  groupingEnabled: React.PropTypes.bool,
  groupByColumn: React.PropTypes.func,
};
