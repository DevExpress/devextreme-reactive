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
      style={style}
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
          <i className="glyphicon glyphicon-th-list" />
        </div>
      )}
      <span
        style={{
          float: titleFloat,
          whiteSpace: 'nowrap',
        }}
      >
        {column.title}
      </span>
      {sortingEnabled && (
        <i
          className={`glyphicon ${iconName}`}
          style={{
            margin: '0 5px',
            visibility: sortDirection ? 'visible' : 'hidden',
            float: titleFloat,
          }}
        />
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
