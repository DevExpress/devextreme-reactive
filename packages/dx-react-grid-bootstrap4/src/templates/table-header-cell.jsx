import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

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
      className, column, tableColumn,
      draggingEnabled, onWidthDraftCancel,
      resizingEnabled, onWidthChange, onWidthDraft, getCellWidth,
      tableRow, children,
      // @deprecated
      showGroupingControls, onGroup, groupingEnabled,
      showSortingControls, sortingDirection, sortingEnabled, onSort, before,
      ...restProps
    } = this.props;
    const { dragging } = this.state;

    const cellLayout = (
      <th
        className={classNames({
          'position-relative dx-g-bs4-header-cell': true,
          'dx-g-bs4-user-select-none': draggingEnabled,
          'dx-g-bs4-cursor-pointer': draggingEnabled,
          'dx-g-bs4-inactive': dragging || (tableColumn && tableColumn.draft),
          'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
        }, className)}
        scope="col"
        ref={this.cellRef}
        {...restProps}
      >
        <div
          className="d-flex flex-direction-row align-items-center"
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
  before: PropTypes.node,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  column: PropTypes.object,
  className: PropTypes.string,
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  getCellWidth: PropTypes.func,
};

TableHeaderCell.defaultProps = {
  before: undefined,
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  className: undefined,
  showSortingControls: false,
  sortingEnabled: false,
  sortingDirection: undefined,
  onSort: undefined,
  showGroupingControls: false,
  onGroup: undefined,
  groupingEnabled: false,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  children: undefined,
  getCellWidth: () => {},
};
