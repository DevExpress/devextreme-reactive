import React from 'react';
import PropTypes from 'prop-types';
import { SortingIndicator } from './parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const isActionKey = keyCode => keyCode === ENTER_KEY_CODE || keyCode === SPACE_KEY_CODE;

export const GroupPanelItem = ({
  column, draft,
  groupByColumn, allowUngroupingByClick,
  allowSorting, sortingDirection, changeSortingDirection,
}) => {
  const handleSortingChange = (e) => {
    const isActionKeyDown = isActionKey(e.keyCode);
    const isMouseClick = e.keyCode === undefined;

    if (!allowSorting || !(isActionKeyDown || isMouseClick)) return;

    const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
    const cancel = (isMouseClick && cancelSortingRelatedKey)
      || (isActionKeyDown && cancelSortingRelatedKey);

    e.preventDefault();
    changeSortingDirection({
      keepOther: cancelSortingRelatedKey,
      cancel,
      columnName: column.name,
    });
  };
  const handleUngroup = (e) => {
    const isActionKeyDown = isActionKey(e.keyCode);
    const isMouseClick = e.keyCode === undefined;

    if (!isActionKeyDown && !isMouseClick) return;
    groupByColumn({ columnName: column.name });
  };
  return (
    <div
      className="btn-group"
      style={{
        marginRight: '5px',
        marginBottom: '5px',
        ...draft ? { opacity: 0.3 } : null,
      }}
    >
      <span
        className="btn btn-default"
        onClick={handleSortingChange}
        onKeyDown={handleSortingChange}
        {...allowSorting ? { tabIndex: 0 } : null}
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
        <span
          className="btn btn-default"
          onClick={handleUngroup}
        >
          &nbsp;
          <i
            className="glyphicon glyphicon-remove"
            style={{
              top: 0,
              fontSize: '9px',
              marginLeft: '-5px',
            }}
          />
        </span>)}
    </div>
  );
};

GroupPanelItem.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  draft: PropTypes.string,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  groupByColumn: PropTypes.func,
  allowUngroupingByClick: PropTypes.bool,
};

GroupPanelItem.defaultProps = {
  draft: undefined,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  groupByColumn: undefined,
  allowUngroupingByClick: false,
};
