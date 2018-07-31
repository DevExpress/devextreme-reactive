import * as React from 'react';
import * as PropTypes from 'prop-types';

import { DragSource } from '@devexpress/dx-react-core';

import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';

export class TableHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
  }

  render() {
    const {
      style, column, tableColumn, before,
      showSortingControls, sortingDirection, sortingEnabled,
      showGroupingControls, onGroup, groupingEnabled,
      draggingEnabled, resizingEnabled,
      onWidthChange, onWidthDraft, onWidthDraftCancel,
      tableRow, getMessage, onSort, children,
      ...restProps
    } = this.props;
    const { dragging } = this.state;
    const align = (tableColumn && tableColumn.align) || 'left';
    const isCellInteractive = (showSortingControls && sortingEnabled) || draggingEnabled;

    const cellLayout = (
      <th
        style={{
          position: 'relative',
          ...(isCellInteractive ? {
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
          } : null),
          ...(draggingEnabled ? { cursor: 'pointer' } : null),
          ...(dragging || (tableColumn && tableColumn.draft) ? { opacity: 0.3 } : null),
          ...style,
        }}
        {...restProps}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {before}
          <div
            style={{
              width: '100%',
              textAlign: align,
              whiteSpace: (tableColumn && tableColumn.wordWrapEnabled) ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              ...(showSortingControls ? {
                margin: '-5px',
                padding: '5px',
              } : null),
            }}
          >
            {showSortingControls ? (
              <SortingControl
                align={align}
                disabled={!sortingEnabled}
                sortingDirection={sortingDirection}
                columnTitle={columnTitle}
                onClick={this.onClick}
              />
            ) : (
              columnTitle
            )}
          </div>
          {showGroupingControls && (
            <div
              style={{
                flex: 'none',
              }}
            >
              <GroupingControl
                align={align}
                disabled={!groupingEnabled}
                onGroup={onGroup}
              />
            </div>
          )}
        </div>
        {children}
        {resizingEnabled && (
          <ResizingControl
            onWidthChange={onWidthChange}
            onWidthDraft={onWidthDraft}
            onWidthDraftCancel={onWidthDraftCancel}
          />
        )}
      </th>
    );

    return draggingEnabled ? (
      <DragSource
        ref={(element) => { this.cellRef = element; }}
        payload={[{ type: 'column', columnName: column.name }]}
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
  tableRow: PropTypes.object,
  column: PropTypes.object,
  style: PropTypes.object,
  showSortingControls: PropTypes.bool,
  sortingEnabled: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  onSort: PropTypes.func,
  showGroupingControls: PropTypes.bool,
  onGroup: PropTypes.func,
  groupingEnabled: PropTypes.bool,
  draggingEnabled: PropTypes.bool,
  resizingEnabled: PropTypes.bool,
  onWidthChange: PropTypes.func,
  onWidthDraft: PropTypes.func,
  onWidthDraftCancel: PropTypes.func,
  getMessage: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  before: PropTypes.node,
};

TableHeaderCell.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  style: null,
  showSortingControls: false,
  sortingDirection: undefined,
  onSort: undefined,
  showGroupingControls: false,
  sortingEnabled: false,
  onGroup: undefined,
  groupingEnabled: false,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  getMessage: undefined,
  children: undefined,
  before: undefined,
};
