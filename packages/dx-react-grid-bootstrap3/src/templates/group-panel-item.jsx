import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortingIndicator } from './parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const isActionKey = keyCode => keyCode === ENTER_KEY_CODE || keyCode === SPACE_KEY_CODE;

export const GroupPanelItem = ({
  item: { column, draft },
  onGroup, allowUngroupingByClick,
  allowSorting, sortingDirection, onSort, className,
  ...restProps
}) => {
  const handleSortingChange = (e) => {
    const isActionKeyDown = isActionKey(e.keyCode);
    const isMouseClick = e.keyCode === undefined;

    if (!allowSorting || !(isActionKeyDown || isMouseClick)) return;

    const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
    const cancel = (isMouseClick && cancelSortingRelatedKey)
      || (isActionKeyDown && cancelSortingRelatedKey);

    e.preventDefault();
    onSort({
      keepOther: cancelSortingRelatedKey,
      cancel,
      columnName: column.name,
    });
  };
  const handleUngroup = (e) => {
    const isActionKeyDown = isActionKey(e.keyCode);
    const isMouseClick = e.keyCode === undefined;

    if (!isActionKeyDown && !isMouseClick) return;
    onGroup({ columnName: column.name });
  };
  return (
    <div
      className={classNames('btn-group', className)}
      style={{
        marginRight: '5px',
        marginBottom: '5px',
        ...draft ? { opacity: 0.3 } : null,
      }}
      {...restProps}
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
  item: PropTypes.shape({
    column: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    draft: PropTypes.string,
  }).isRequired,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  className: PropTypes.string,
  onSort: PropTypes.func,
  onGroup: PropTypes.func,
  allowUngroupingByClick: PropTypes.bool,
};

GroupPanelItem.defaultProps = {
  allowSorting: false,
  sortingDirection: undefined,
  className: undefined,
  onSort: undefined,
  onGroup: undefined,
  allowUngroupingByClick: false,
};
