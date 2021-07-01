import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

import { DragSource } from '@devexpress/dx-react-core';

import { ResizingControl } from './table-header-cell/resizing-control';
import { BodyColorContext } from './layout';

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
      tableRow, children, isFixed, style,
      ...restProps
    } = this.props;
    const { dragging } = this.state;
    const backgroundColor = this.context;

    const cellLayout = (
      <th
        className={classNames({
          'dx-g-bs4-header-cell': true,
          'dx-g-bs4-fixed-header-cell': isFixed,
          'position-relative': !isFixed,
          'dx-g-bs4-user-select-none': draggingEnabled,
          'dx-g-bs4-cursor-pointer': draggingEnabled,
          'dx-g-bs4-inactive': dragging || (tableColumn && tableColumn.draft),
          'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
        }, className)}
        scope="col"
        ref={this.cellRef}
        style={{
          ...(isFixed && { backgroundColor }),
          ...style,
        }}
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

TableHeaderCell.contextType = BodyColorContext;

TableHeaderCell.propTypes = {
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  column: PropTypes.object,
  className: PropTypes.string,
  draggingEnabled: PropTypes.bool,
  resizingEnabled: PropTypes.bool,
  style: PropTypes.object,
  onWidthChange: PropTypes.func,
  onWidthDraft: PropTypes.func,
  onWidthDraftCancel: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  getCellWidth: PropTypes.func,
  isFixed: PropTypes.bool,
};

TableHeaderCell.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  className: undefined,
  draggingEnabled: false,
  resizingEnabled: false,
  style: null,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  children: undefined,
  getCellWidth: () => {},
  isFixed: true,
};
