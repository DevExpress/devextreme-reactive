import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { SortingIndicator } from './parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const isActionKey = keyCode => keyCode === ENTER_KEY_CODE || keyCode === SPACE_KEY_CODE;

export const GroupPanelItem = ({
  item: { column, draft },
  onGroup, showGroupingControls, groupingEnabled,
  showSortingControls, sortingDirection, onSort, sortingEnabled,
  className, style, forwardedRef,
  ...restProps
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
  const getButtonClasses = isDisabled => (classNames({
    btn: true,
    'btn-default': true,
    disabled: isDisabled,
  }));
  return (
    <div
      ref={forwardedRef}
      className={classNames('btn-group', className)}
      style={{
        marginRight: '5px',
        marginBottom: '5px',
        ...draft ? { opacity: 0.3 } : null,
        ...style,
      }}
      {...restProps}
    >
      <span
        className={getButtonClasses(!sortingEnabled && (showSortingControls || !groupingEnabled))}
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
          className={getButtonClasses(!groupingEnabled)}
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
        </span>
      )}
    </div>
  );
};

GroupPanelItem.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    draft: PropTypes.bool,
  }).isRequired,
  showSortingControls: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  className: PropTypes.string,
  onSort: PropTypes.func,
  onGroup: PropTypes.func,
  groupingEnabled: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  sortingEnabled: PropTypes.bool,
  style: PropTypes.object,
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
  style: null,
};
