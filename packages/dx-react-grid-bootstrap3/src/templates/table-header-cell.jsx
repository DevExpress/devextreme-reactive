import * as React from 'react';
import * as PropTypes from 'prop-types';

import { DragSource } from '@devexpress/dx-react-core';

import { ResizingControl } from './table-header-cell/resizing-control';
import { StyleContext } from './layout';

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
      tableRow, children, isFixed,
      ...restProps
    } = this.props;
    const { dragging } = this.state;
    const { backgroundColor, stickyPosition } = this.context;

    const cellLayout = (
      <th
        style={{
          ...(draggingEnabled ? {
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
          } : null),
          whiteSpace: !(tableColumn && tableColumn.wordWrapEnabled) ? 'nowrap' : 'normal',
          ...(draggingEnabled ? { cursor: 'pointer' } : null),
          ...(dragging || (tableColumn && tableColumn.draft) ? { opacity: 0.3 } : null),
          ...(isFixed && {
            position: stickyPosition,
            top: 0,
            backgroundColor,
          }),
          ...(!isFixed && { position: 'relative' }),
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

TableHeaderCell.contextType = StyleContext;

TableHeaderCell.propTypes = {
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  column: PropTypes.object,
  style: PropTypes.object,
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
  isFixed: PropTypes.bool,
};

TableHeaderCell.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  style: null,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  children: undefined,
  getCellWidth: () => {},
  isFixed: true,
};
