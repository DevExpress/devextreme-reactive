import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortingIndicator } from './parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const isActionKey = keyCode => keyCode === ENTER_KEY_CODE || keyCode === SPACE_KEY_CODE;

export const GroupPanelItem = ({
  item: { column, draft },
  onGroup, showGroupingControls, showSortingControls,
  sortingDirection, onSort, className, style,
  ...restProps
}) => {
  const handleSortingChange = (e) => {
    const isActionKeyDown = isActionKey(e.keyCode);
    const isMouseClick = e.keyCode === undefined;

    if (!showSortingControls || !(isActionKeyDown || isMouseClick)) return;

    const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
    const direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey
      ? null
      : undefined;

    e.preventDefault();
    onSort({
      direction,
      keepOther: cancelSortingRelatedKey,
    });
  };
  const handleUngroup = (e) => {
    const isActionKeyDown = isActionKey(e.keyCode);
    const isMouseClick = e.keyCode === undefined;

    if (!isActionKeyDown && !isMouseClick) return;
    onGroup();
  };
  return (
    <div
      className={classNames('btn-group mb-1 mr-1', className)}
      style={{
        ...draft ? { opacity: 0.3 } : null,
        ...style,
      }}
      {...restProps}
    >
      <span
        className="btn btn-outline-secondary"
        onClick={handleSortingChange}
        onKeyDown={handleSortingChange}
        {...showSortingControls ? { tabIndex: 0 } : null}
      >
        {column.title || column.name}
        {showSortingControls && sortingDirection && (
          <span>
            &nbsp;
            <SortingIndicator
              direction={sortingDirection}
            />
          </span>
        )}
      </span>

      {showGroupingControls && (
        <span
          className="btn btn-outline-secondary"
          onClick={handleUngroup}
        >
          &nbsp;
          <span
            className="oi oi-x"
            style={{
              top: -1,
              fontSize: '11px',
              marginLeft: '-4px',
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
    draft: PropTypes.bool,
  }).isRequired,
  showSortingControls: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  className: PropTypes.string,
  onSort: PropTypes.func,
  onGroup: PropTypes.func,
  showGroupingControls: PropTypes.bool,
  style: PropTypes.object,
};

GroupPanelItem.defaultProps = {
  showSortingControls: false,
  sortingDirection: undefined,
  className: undefined,
  onSort: undefined,
  onGroup: undefined,
  showGroupingControls: false,
  style: null,
};
