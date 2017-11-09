import React from 'react';
import PropTypes from 'prop-types';

import { DragSource } from '@devexpress/dx-react-core';

import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';
import { SortingControl } from './table-header-cell/sorting-control';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

export class TableHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
    this.onClick = (e) => {
      const { allowSorting, changeSortingDirection } = this.props;
      const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
      const isMouseClick = e.keyCode === undefined;

      if (!allowSorting || !(isActionKeyDown || isMouseClick)) return;

      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      const cancel = (isMouseClick && cancelSortingRelatedKey)
        || (isActionKeyDown && cancelSortingRelatedKey);

      e.preventDefault();
      changeSortingDirection({
        keepOther: e.shiftKey || cancelSortingRelatedKey,
        cancel,
      });
    };
  }
  render() {
    const {
      style, column, tableColumn,
      allowSorting, sortingDirection,
      allowGroupingByClick, groupByColumn,
      allowDragging, dragPayload,
      allowResizing, changeColumnWidth, changeDraftColumnWidth,
    } = this.props;
    const { dragging } = this.state;
    const align = column.align || 'left';
    const columnTitle = column.title || column.name;

    const cellLayout = (
      <th
        style={{
          position: 'relative',
          ...(allowSorting || allowDragging ? {
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
          } : {}),
          ...(allowSorting || allowDragging ? { cursor: 'pointer' } : null),
          ...(dragging || tableColumn.draft ? { opacity: 0.3 } : null),
          padding: '5px',
          ...style,
        }}
        onClick={this.onClick}
      >
        {allowGroupingByClick && (
          <GroupingControl
            align={align}
            groupByColumn={groupByColumn}
          />
        )}
        <div
          style={{
            ...(allowGroupingByClick ? { [`margin${column.align === 'right' ? 'Left' : 'Right'}`]: '14px' } : null),
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
            changeColumnWidth={changeColumnWidth}
            changeDraftColumnWidth={changeDraftColumnWidth}
          />
        )}
      </th>
    );

    return allowDragging ? (
      <DragSource
        ref={(element) => { this.cellRef = element; }}
        getPayload={() => dragPayload}
        onStart={() => this.setState({ dragging: true })}
        onEnd={() => this.cellRef && this.setState({ dragging: false })}
      >
        {cellLayout}
      </DragSource>
    ) : cellLayout;
  }
}

TableHeaderCell.propTypes = {
  tableColumn: PropTypes.object,
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  allowGroupingByClick: PropTypes.bool,
  groupByColumn: PropTypes.func,
  allowDragging: PropTypes.bool,
  dragPayload: PropTypes.any,
  allowResizing: PropTypes.bool,
  changeColumnWidth: PropTypes.func,
  changeDraftColumnWidth: PropTypes.func,
};

TableHeaderCell.defaultProps = {
  tableColumn: {},
  style: null,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGroupingByClick: false,
  groupByColumn: undefined,
  allowDragging: false,
  dragPayload: null,
  allowResizing: false,
  changeColumnWidth: undefined,
  changeDraftColumnWidth: undefined,
};
