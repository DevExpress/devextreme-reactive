import * as React from 'react';
import * as PropTypes from 'prop-types';

import { DragSource } from '@devexpress/dx-react-core';

import { ResizingControl } from './table-header-cell/resizing-control';

export class TableHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
    this.dragRef = React.createRef();
    this.cellRef = React.createRef();
    this.getWidthGetter = () => {
      const { getCellWidth } = this.props;
      const node = this.cellRef.current;
      return node && getCellWidth(() => {
        const { width } = node.getBoundingClientRect();
        return width;
      });
    };

    this.onDragStart = () => {
      this.setState({ dragging: true });
    };
    this.onDragEnd = () => {
      if (this.dragRef.current) {
        this.setState({ dragging: false });
      }
    };
  }

  componentDidMount() {
    this.getWidthGetter();
  }

  render() {
    const {
      style, column, tableColumn,
      draggingEnabled, resizingEnabled,
      onWidthChange, onWidthDraft, onWidthDraftCancel, getCellWidth,
      tableRow, children,
      // @deprecated
      showGroupingControls, onGroup, groupingEnabled,
      showSortingControls, sortingDirection, sortingEnabled, onSort, before,
      ...restProps
    } = this.props;
    const { dragging } = this.state;

    const cellLayout = (
      <th
        style={{
          position: 'relative',
          ...(draggingEnabled ? {
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
          } : null),
          whiteSpace: !(tableColumn && tableColumn.wordWrapEnabled) ? 'nowrap' : 'normal',
          ...(draggingEnabled ? { cursor: 'pointer' } : null),
          ...(dragging || (tableColumn && tableColumn.draft) ? { opacity: 0.3 } : null),
          ...style,
        }}
        ref={this.cellRef}
        {...restProps}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
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
        ref={this.dragRef}
        payload={[{ type: 'column', columnName: column.name }]}
        onStart={this.onDragStart}
        onEnd={this.onDragEnd}
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
  getCellWidth: PropTypes.func,
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
  children: undefined,
  before: undefined,
  getCellWidth: () => {},
};
