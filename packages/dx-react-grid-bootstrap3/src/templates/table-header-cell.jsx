import React from 'react';
import PropTypes from 'prop-types';
import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';
import { SortingControl } from './table-header-cell/sorting-control';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

export class TableHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClick = (e) => {
      const { allowSorting, onSort } = this.props;
      const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
      const isMouseClick = e.keyCode === undefined;

      if (!allowSorting || !(isActionKeyDown || isMouseClick)) return;

      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      const cancel = (isMouseClick && cancelSortingRelatedKey)
        || (isActionKeyDown && cancelSortingRelatedKey);

      e.preventDefault();
      onSort({
        keepOther: e.shiftKey || cancelSortingRelatedKey,
        cancel,
      });
    };
  }
  render() {
    const {
      style, column, tableColumn,
      allowSorting, sortingDirection,
      showGroupingControls, onGroup,
      allowDragging, draft,
      allowResizing, onWidthChange, onDraftWidthChange,
      tableRow, getMessage, onSort,
      ...restProps
    } = this.props;
    const align = column.align || 'left';
    const columnTitle = column.title || column.name;

    return (
      <th
        style={{
          position: 'relative',
          ...(allowSorting || allowDragging ? {
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
          } : {}),
          ...(allowSorting || allowDragging ? { cursor: 'pointer' } : null),
          ...(draft ? { opacity: 0.3 } : null),
          padding: '5px',
          ...style,
        }}
        onClick={this.onClick}
        {...restProps}
      >
        {showGroupingControls && (
          <GroupingControl
            align={align}
            onGroup={onGroup}
          />
        )}
        <div
          style={{
            ...(showGroupingControls ? { [`margin${column.align === 'right' ? 'Left' : 'Right'}`]: '14px' } : null),
            textAlign: align,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '3px',
          }}
        >
          {allowSorting ? (
            <SortingControl
              align={align}
              sortingDirection={sortingDirection}
              columnTitle={columnTitle}
              onClick={this.onClick}
            />
          ) : (
            columnTitle
          )}
        </div>
        {allowResizing && (
          <ResizingControl
            onWidthChange={onWidthChange}
            onDraftWidthChange={onDraftWidthChange}
          />
        )}
      </th>
    );
  }
}

TableHeaderCell.propTypes = {
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  onSort: PropTypes.func,
  showGroupingControls: PropTypes.bool,
  onGroup: PropTypes.func,
  allowDragging: PropTypes.bool,
  draft: PropTypes.bool,
  allowResizing: PropTypes.bool,
  onWidthChange: PropTypes.func,
  onDraftWidthChange: PropTypes.func,
  getMessage: PropTypes.func,
};

TableHeaderCell.defaultProps = {
  tableColumn: {},
  tableRow: undefined,
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  onSort: undefined,
  showGroupingControls: false,
  onGroup: undefined,
  allowDragging: false,
  draft: false,
  allowResizing: false,
  onWidthChange: undefined,
  onDraftWidthChange: undefined,
  getMessage: undefined,
};
