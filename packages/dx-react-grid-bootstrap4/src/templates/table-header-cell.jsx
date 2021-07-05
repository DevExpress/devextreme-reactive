import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

import { DragSource } from '@devexpress/dx-react-core';

import { ResizingControl } from './table-header-cell/resizing-control';

class TableHeaderCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
    this.dragRef = React.createRef();
    this.getWidthGetter = () => {
      const { getCellWidth, refObject } = this.props;
      const node = refObject.current;
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
      refObject, updateRefForKeyboardNavigation, setFocusedElement,
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
          'dx-g-bs4-focus-cell': !!updateRefForKeyboardNavigation,
        }, className)}
        scope="col"
        ref={refObject}
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

TableHeaderCellBase.propTypes = {
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  column: PropTypes.object,
  className: PropTypes.string,
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
  refObject: PropTypes.object,
  updateRefForKeyboardNavigation: PropTypes.func,
  setFocusedElement: PropTypes.func,
};

TableHeaderCellBase.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  className: undefined,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  children: undefined,
  getCellWidth: () => {},
  refObject: undefined,
  updateRefForKeyboardNavigation: undefined,
  setFocusedElement: undefined,
};

export const TableHeaderCell = withKeyboardNavigation()(TableHeaderCellBase);
