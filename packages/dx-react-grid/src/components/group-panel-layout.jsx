import React from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from '@devexpress/dx-react-core';
import { getColumnSortingDirection, getGroupCellTargetIndex } from '@devexpress/dx-grid-core';

const getSortingConfig = (sorting, column) => {
  const result = {
    sortingSupported: !column.type && sorting !== undefined,
  };

  if (result.sortingSupported) {
    result.sortingDirection = getColumnSortingDirection(sorting, column.name);
  }

  return result;
};

export class GroupPanelLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sourceColumnName: null,
      sourceColumnIndex: -1,
      targetColumnIndex: -1,
    };

    this.onEnter = ({ payload }) => {
      const { groupedColumns } = this.props;
      const sourceColumnName = payload[0].columnName;
      const sourceColumnIndex = groupedColumns.findIndex(
        column => column.name === sourceColumnName);
      this.setState({
        sourceColumnName,
        sourceColumnIndex,
      });
    };
    this.onOver = ({ clientOffset }) => {
      const { draftGroupingChange } = this.props;
      const {
        sourceColumnName, sourceColumnIndex,
        targetColumnIndex: prevTargetColumnIndex,
      } = this.state;
      const itemGeometries = this.itemRefs.map(element => element.getBoundingClientRect());
      const targetColumnIndex = getGroupCellTargetIndex(
        itemGeometries, sourceColumnIndex, clientOffset);

      if (prevTargetColumnIndex === targetColumnIndex) return;

      draftGroupingChange({
        columnName: sourceColumnName,
        groupIndex: targetColumnIndex,
      });
      this.setState({ targetColumnIndex });
    };
    this.onLeave = () => {
      const { draftGroupingChange } = this.props;
      const { sourceColumnName } = this.state;
      draftGroupingChange({
        columnName: sourceColumnName,
        groupIndex: -1,
      });
      this.setState({
        sourceColumnName,
        targetColumnIndex: -1,
      });
    };
    this.onDrop = () => {
      const { groupByColumn } = this.props;
      const { sourceColumnName, targetColumnIndex } = this.state;
      this.resetState();
      groupByColumn({
        columnName: sourceColumnName,
        groupIndex: targetColumnIndex,
      });
    };
    this.onDragEnd = () => {
      const { sourceColumnName, targetColumnIndex } = this.state;
      const { groupByColumn } = this.props;
      if (sourceColumnName && targetColumnIndex === -1) {
        groupByColumn({
          columnName: sourceColumnName,
        });
      }
      this.resetState();
    };
  }

  getCells() {
    const {
      allowSorting, sorting, changeSortingDirection,
      groupedColumns,
      groupByColumn,
      groupPanelCellTemplate,
      allowDraggingAndDropping,
    } = this.props;

    this.itemRefs = [];
    return groupedColumns.map((column) => {
      const { sortingSupported, sortingDirection } = getSortingConfig(sorting, column);
      const cell = groupPanelCellTemplate({
        column,
        allowSorting: allowSorting && sortingSupported,
        sortingDirection,
        changeSortingDirection,
        groupByColumn,
      });

      return allowDraggingAndDropping
        ? (
          <DragSource
            key={column.name}
            getPayload={() => [{ type: 'column', columnName: column.name }]}
            onEnd={this.onDragEnd}
          >
            <div
              ref={element => element && this.itemRefs.push(element)}
              style={{ display: 'inline-block' }}
            >
              {cell}
            </div>
          </DragSource>
        )
        : (
          <div
            ref={element => element && this.itemRefs.push(element)}
            key={column.name}
            style={{ display: 'inline-block' }}
          >
            {cell}
          </div>
      );
    });
  }

  resetState() {
    const { cancelGroupingChange } = this.props;
    cancelGroupingChange();
    this.setState({
      sourceColumnName: null,
      sourceColumnIndex: -1,
      targetColumnIndex: -1,
    });
  }

  render() {
    const {
      groupByColumnText,
      panelTemplate,
      allowDraggingAndDropping,
    } = this.props;

    const cells = this.getCells();

    const groupPanel = (
      cells.length
        ? panelTemplate({ cells })
        : <span>{groupByColumnText}</span>
    );

    return allowDraggingAndDropping
      ? (
        <DropTarget
          onEnter={this.onEnter}
          onOver={this.onOver}
          onLeave={this.onLeave}
          onDrop={this.onDrop}
        >
          {groupPanel}
        </DropTarget>
      )
      : groupPanel;
  }
}

GroupPanelLayout.propTypes = {
  allowSorting: PropTypes.bool,
  sorting: PropTypes.any,
  changeSortingDirection: PropTypes.func,
  groupedColumns: PropTypes.array.isRequired,
  groupByColumn: PropTypes.func,
  groupByColumnText: PropTypes.any,
  groupPanelCellTemplate: PropTypes.func.isRequired,
  panelTemplate: PropTypes.func.isRequired,
  allowDraggingAndDropping: PropTypes.bool,
  draftGroupingChange: PropTypes.func,
  cancelGroupingChange: PropTypes.func,
};

GroupPanelLayout.defaultProps = {
  allowSorting: false,
  sorting: undefined,
  changeSortingDirection: () => {},
  groupByColumn: () => {},
  groupByColumnText: undefined,
  allowDraggingAndDropping: false,
  draftGroupingChange: () => {},
  cancelGroupingChange: () => {},
};
