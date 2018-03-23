import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { DragSource } from '@devexpress/dx-react-core';

import { ResizingControl } from './table-header-cell/resizing-control';
import { GroupingControl } from './table-header-cell/grouping-control';

import './table-header-cell.css';

export class TableHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
    this.getSort = ({ direction, keepOther }) => {
      const { sortingEnabled, showSortingControls, onSort } = this.props;
      if (!showSortingControls || !sortingEnabled) return;
      onSort({ direction, keepOther });
    };
  }
  render() {
    const {
      className, column, tableColumn,
      showSortingControls, sortingDirection, sortingEnabled, sortingComponent: SortingControl,
      showGroupingControls, onGroup, groupingEnabled,
      draggingEnabled, onWidthDraftCancel,
      resizingEnabled, onWidthChange, onWidthDraft,
      tableRow, getMessage, onSort,
      ...restProps
    } = this.props;
    const { dragging } = this.state;
    const align = (tableColumn && tableColumn.align) || 'left';
    const columnTitle = column && (column.title || column.name);
    const isCellInteractive = (showSortingControls && sortingEnabled) || draggingEnabled;

    const cellLayout = (
      <th
        className={classNames({
          'position-relative': true,
          'dx-rg-bs4-user-select-none': isCellInteractive,
          'dx-rg-bs4-cursor-pointer': draggingEnabled,
          'dx-rg-bs4-inactive': dragging || (tableColumn && tableColumn.draft),
        }, className)}
        scope="col"
        {...restProps}
      >
        {showGroupingControls && (
          <GroupingControl
            align={align}
            onGroup={onGroup}
            disabled={!groupingEnabled}
          />
        )}
        <div
          className={classNames({
            'text-nowrap dx-rg-bs4-table-header-cell-wrapper': true,
            [`text-${align}`]: align !== 'left',
            [`dx-rg-bs4-table-header-cell-${align}`]: showGroupingControls,
          })}
        >
          {showSortingControls ? (
            <SortingControl
              align={align}
              sortingDirection={sortingDirection}
              disabled={!sortingEnabled}
              title={columnTitle}
              sort={this.getSort}
            />
          ) : (
            columnTitle
          )}
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
  getMessage: PropTypes.func,
  sortingComponent: PropTypes.func,
};

TableHeaderCell.defaultProps = {
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
  getMessage: undefined,
  sortingComponent: () => {},
};
