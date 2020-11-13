import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { SortingIndicator } from './parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const isActionKey = keyCode => keyCode === ENTER_KEY_CODE || keyCode === SPACE_KEY_CODE;

export const GroupPanelItem = ({
  item: { column, draft },
  onGroup, showGroupingControls, showSortingControls,
  sortingDirection, onSort, className, groupingEnabled,
  sortingEnabled, forwardedRef, ...restProps
}) => {
  const handleSortingChange = (e) => {
    const isActionKeyDown = isActionKey(e.keyCode);
    const isMouseClick = e.keyCode === undefined;

    if ((!showSortingControls || !sortingEnabled) || !(isActionKeyDown || isMouseClick)) return;

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
    if (!groupingEnabled) return;
    const isActionKeyDown = isActionKey(e.keyCode);
    const isMouseClick = e.keyCode === undefined;

    if (!isActionKeyDown && !isMouseClick) return;
    onGroup();
  };
  return (
    <div
      ref={forwardedRef}
      className={classNames({
        'btn-group mb-1 mr-1': true,
        'dx-g-bs4-inactive': draft,
      }, className)}
      {...restProps}
    >
      <span
        className={classNames({
          'btn btn-outline-secondary': true,
          disabled: !sortingEnabled && (showSortingControls || !groupingEnabled),
        })}
        onClick={handleSortingChange}
        onKeyDown={handleSortingChange}
        {...sortingEnabled ? { tabIndex: 0 } : null}
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
          className={classNames({
            'btn btn-outline-secondary': true,
            disabled: !groupingEnabled,
          })}
          onClick={handleUngroup}
        >
          &nbsp;
          <span
            className="oi oi-x dx-g-bs4-group-panel-item-icon"
          />
        </span>
      )}
    </div>
  );
};

GroupPanelItem.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
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
  groupingEnabled: PropTypes.bool,
  sortingEnabled: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

GroupPanelItem.defaultProps = {
  showSortingControls: false,
  sortingDirection: undefined,
  className: undefined,
  onSort: undefined,
  onGroup: undefined,
  showGroupingControls: false,
  sortingEnabled: false,
  groupingEnabled: false,
};
