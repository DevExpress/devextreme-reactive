import React from 'react';

export const GroupPanelCell = ({
  column,
  groupByColumn,
  sortingEnabled, sortDirection, changeSortDirection,
}) => {
  const iconName = `glyphicon-arrow-${sortDirection === 'asc' ? 'down' : 'up'}`;
  return (
    <button
      type="button"
      className="btn btn-default"
      style={{
        marginRight: '5px',
      }}
    >
      <span
        onClick={(e) => {
          if (!sortingEnabled) return;
          changeSortDirection({ keepOther: e.shiftKey });
        }}
      >
        {column.title}
        {sortingEnabled && sortDirection && (
          <i
            className={`glyphicon ${iconName}`}
            style={{
              marginLeft: '8px',
            }}
          />
        )}
      </span>
      <i
        className="glyphicon glyphicon-remove"
        style={{
          marginLeft: '8px',
        }}
        onClick={() => groupByColumn({ columnName: column.name })}
      />
    </button>
  );
};

GroupPanelCell.defaultProps = {
  sortingEnabled: false,
  sortDirection: undefined,
  changeSortDirection: undefined,
  groupingEnabled: false,
  groupByColumn: undefined,
};

GroupPanelCell.propTypes = {
  column: React.PropTypes.shape({
    title: React.PropTypes.string,
  }).isRequired,
  sortingEnabled: React.PropTypes.bool,
  sortDirection: React.PropTypes.oneOf(['asc', 'desc', null]),
  changeSortDirection: React.PropTypes.func,
  groupByColumn: React.PropTypes.func,
};
