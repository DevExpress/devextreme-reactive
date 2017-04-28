import React from 'react';

export const TableHeaderCell = ({
  style, column,
  sortingEnabled, sortDirection, changeSortDirection,
  groupingEnabled, groupByColumn,
}) => {
  const iconName = `glyphicon-arrow-${sortDirection === 'asc' ? 'down' : 'up'}`;
  const align = column.align || 'left';
  const invertedAlign = align === 'left' ? 'right' : 'left';

  const gropingControl = groupingEnabled && (
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

  const sortingControls = [
    <i
      className={`glyphicon ${iconName}`}
      style={{
        visibility: sortDirection ? 'visible' : 'hidden',
        top: '0',
        fontSize: '9px',
      }}
    />,
    <span>&nbsp;</span>,
    column.title,
  ];

  return (
    <th
      style={{
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: sortingEnabled && !column.type && 'pointer',
        ...style,
      }}
      onClick={(e) => {
        if (!sortingEnabled) return;
        e.stopPropagation();
        changeSortDirection({ keepOther: e.shiftKey });
      }}
    >
      {gropingControl}
      <div
        style={{
          [`margin${column.align === 'right' ? 'Left' : 'Right'}`]: '14px',
          textAlign: align,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {sortingEnabled ? (
          <span
            className={sortDirection ? 'text-primary' : ''}
          >
            {align === 'right' ? sortingControls : sortingControls.reverse()}
          </span>
        ) : (
          column.title
        )}
      </div>
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
