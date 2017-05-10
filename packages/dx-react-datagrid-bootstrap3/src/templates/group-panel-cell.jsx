import React from 'react';
import PropTypes from 'prop-types';

import { SortingIndicator } from './parts/sorting-indicator';

export const GroupPanelCell = ({
  column,
  groupByColumn,
  sortingEnabled, sortDirection, changeSortDirection,
}) => (
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
        <span>
          &nbsp;
          <SortingIndicator
            direction={sortDirection}
          />
        </span>
      )}
    </span>
    &nbsp;
    <i
      className="glyphicon glyphicon-remove"
      style={{
        top: '0',
        fontSize: '9px',
        margin: '-5px',
        padding: '5px',
      }}
      onClick={() => groupByColumn({ columnName: column.name })}
    />
  </button>
);

GroupPanelCell.defaultProps = {
  sortingEnabled: false,
  sortDirection: undefined,
  changeSortDirection: undefined,
  groupingEnabled: false,
  groupByColumn: undefined,
};

GroupPanelCell.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  sortingEnabled: PropTypes.bool,
  sortDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortDirection: PropTypes.func,
  groupByColumn: PropTypes.func,
};
