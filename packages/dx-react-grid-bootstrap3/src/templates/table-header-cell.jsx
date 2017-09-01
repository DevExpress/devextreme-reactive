import React from 'react';
import PropTypes from 'prop-types';

import { Draggable, DragSource } from '@devexpress/dx-react-core';

import { SortingIndicator } from './parts/sorting-indicator';

export class TableHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      resizing: false,
    };

    this.onCellClick = (e) => {
      const { allowSorting, changeSortingDirection } = this.props;
      if (!allowSorting) return;
      e.stopPropagation();
      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      changeSortingDirection({
        keepOther: e.shiftKey || cancelSortingRelatedKey,
        cancel: cancelSortingRelatedKey,
      });
    };

    this.onResizeStart = ({ x }) => {
      this.resizeStartingX = x;
      this.setState({ resizing: true });
    };
    this.onResizeUpdate = ({ x }) => {
      const { changeDraftColumnWidth } = this.props;
      changeDraftColumnWidth({ shift: x - this.resizeStartingX });
    };
    this.onResizeEnd = ({ x }) => {
      const { changeColumnWidth } = this.props;
      changeColumnWidth({ shift: x - this.resizeStartingX });
      this.setState({ resizing: false });
    };
  }
  render() {
    const {
      style, column, tableColumn,
      allowSorting, sortingDirection,
      allowGroupingByClick, groupByColumn,
      allowDragging, dragPayload,
      allowResizing,
    } = this.props;
    const { dragging, resizing } = this.state;
    const align = column.align || 'left';
    const invertedAlign = align === 'left' ? 'right' : 'left';
    const columnTitle = column.title || column.name;

    const groupingControl = allowGroupingByClick && (
      <div
        onClick={(e) => {
          e.stopPropagation();
          groupByColumn(e);
        }}
        style={{
          float: invertedAlign,
          textAlign: invertedAlign,
          width: '14px',
        }}
      >
        <i
          className="glyphicon glyphicon-th-list"
          style={{
            top: '0',
            fontSize: '9px',
            margin: '-5px',
            padding: '5px',
          }}
        />
      </div>
    );

    const sortingControl = allowSorting && (
      align === 'right' ? (
        <span
          className={sortingDirection ? 'text-primary' : ''}
        >
          <SortingIndicator
            direction={sortingDirection}
            style={{ visibility: sortingDirection ? 'visible' : 'hidden' }}
          />
          &nbsp;
          {columnTitle}
        </span>
      ) : (
        <span
          className={sortingDirection ? 'text-primary' : ''}
        >
          {columnTitle}
          &nbsp;
          <SortingIndicator
            direction={sortingDirection}
            style={{ visibility: sortingDirection ? 'visible' : 'hidden' }}
          />
        </span>
      )
    );

    const resizingControlLineBody = resizing && (
      <div
        className="bg-primary"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
        }}
      />
    );

    const resizingControl = allowResizing && (
      <Draggable
        onStart={this.onResizeStart}
        onUpdate={this.onResizeUpdate}
        onEnd={this.onResizeEnd}
      >
        <div
          style={{
            position: 'absolute',
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            top: 0,
            right: '-8px',
            width: '16px',
            height: '100%',
            cursor: 'col-resize',
            zIndex: 100,
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#ddd',
              height: '50%',
              width: '1px',
              left: '5px',
              top: '25%',
            }}
          >
            {resizingControlLineBody}
          </div>
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#ddd',
              height: '50%',
              width: '1px',
              left: '7px',
              top: '25%',
            }}
          >
            {resizingControlLineBody}
          </div>
        </div>
      </Draggable>
    );

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
          ...style,
        }}
        onClick={this.onCellClick}
      >
        {groupingControl}
        <div
          style={{
            [`margin${column.align === 'right' ? 'Left' : 'Right'}`]: '14px',
            textAlign: align,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {allowSorting ? sortingControl : (
            columnTitle
          )}
        </div>
        {resizingControl}
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
  style: PropTypes.shape(),
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
