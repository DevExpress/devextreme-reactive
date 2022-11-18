import * as React from 'react';
import PropTypes from 'prop-types';

import { DragSource } from '@devexpress/dx-react-core';

import { CellLayout } from './table-header-cell/cell-layout';

export class TableHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
    this.dragRef = React.createRef();

    this.onDragStart = () => {
      this.setState({ dragging: true });
    };
    this.onDragEnd = () => {
      if (this.dragRef.current) {
        this.setState({ dragging: false });
      }
    };
  }

  render() {
    const { column, draggingEnabled } = this.props;
    const { dragging } = this.state;

    return draggingEnabled ? (
      <DragSource
        ref={this.dragRef}
        payload={[{ type: 'column', columnName: column.name }]}
        onStart={this.onDragStart}
        onEnd={this.onDragEnd}
      >
        <CellLayout {...this.props} dragging={dragging} />
      </DragSource>
    ) : <CellLayout {...this.props} dragging={dragging} />;
  }
}

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
};
