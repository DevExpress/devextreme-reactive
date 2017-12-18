import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from '@devexpress/dx-react-core';

export class TableHeaderCellLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
  }
  render() {
    const {
      column,
      allowDragging,
      draft,
      cellComponent: HeaderCell,
      ...restProps
    } = this.props;

    const headerCell = (
      <HeaderCell
        column={column}
        draft={draft || this.state.dragging}
        {...restProps}
      />
    );

    return allowDragging
      ? (
        <DragSource
          ref={(element) => { this.cellRef = element; }}
          getPayload={() => [{ type: 'column', columnName: column.name }]}
          onStart={() => this.setState({ dragging: true })}
          onEnd={() => this.cellRef && this.setState({ dragging: false })}
        >
          {headerCell}
        </DragSource>
      )
      : headerCell;
  }
}

TableHeaderCellLayout.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  allowDragging: PropTypes.bool,
  draft: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
};

TableHeaderCellLayout.defaultProps = {
  allowDragging: false,
  draft: false,
};
