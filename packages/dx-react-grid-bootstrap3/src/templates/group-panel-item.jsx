import React from 'react';
import PropTypes from 'prop-types';
import { SortingIndicator } from './parts/sorting-indicator';

export const GroupPanelItem = ({
  column, draft,
  groupByColumn, allowUngroupingByClick,
  allowSorting, sortingDirection, changeSortingDirection,
}) => (
  <div
    className="btn btn-default"
    style={{
      marginRight: '5px',
      marginBottom: '5px',
      ...draft ? { opacity: 0.3 } : null,
    }}
  >
    <span
      onClick={(e) => {
        if (!allowSorting) return;
        const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
        changeSortingDirection({
          keepOther: e.shiftKey || cancelSortingRelatedKey,
          cancel: cancelSortingRelatedKey,
          columnName: column.name,
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

    {allowUngroupingByClick && (
      <span>
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
      </span>)}
  </div>
);

GroupPanelItem.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  draft: PropTypes.bool,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  groupByColumn: PropTypes.func,
  allowUngroupingByClick: PropTypes.bool,
};

GroupPanelItem.defaultProps = {
  draft: false,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  groupByColumn: undefined,
  allowUngroupingByClick: false,
};
