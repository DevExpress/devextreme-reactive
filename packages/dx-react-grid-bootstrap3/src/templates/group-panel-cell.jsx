import React from 'react';
import PropTypes from 'prop-types';

import { SortingIndicator } from './parts/sorting-indicator';

export const GroupPanelCell = ({
  column,
  groupByColumn,
  allowSorting, sortingDirection, changeSortingDirection,
}) => (
  <div
    className="btn btn-default"
    style={{
      marginRight: '5px',
    }}
  >
    <span
      onClick={(e) => {
        if (!allowSorting) return;
        const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
        changeSortingDirection({
          keepOther: e.shiftKey || cancelSortingRelatedKey,
          cancel: cancelSortingRelatedKey,
        });
      }}
    >
      {column.title || column.name}
      {allowSorting && sortingDirection && (
        <span>
          &nbsp;
          <SortingIndicator
            direction={sortingDirection}
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
  </div>
);

GroupPanelCell.defaultProps = {
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGrouping: false,
  groupByColumn: undefined,
};

GroupPanelCell.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  groupByColumn: PropTypes.func,
};
