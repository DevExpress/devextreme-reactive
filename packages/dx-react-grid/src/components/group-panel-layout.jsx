import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from '@devexpress/dx-react-core';
import {
  GROUP_ADD_MODE,
  getGroupCellTargetIndex,
} from '@devexpress/dx-grid-core';

export class GroupPanelLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sourceColumnName: null,
      targetColumnIndex: -1,
    };

    this.onEnter = ({ payload }) => {
      this.setState({
        sourceColumnName: payload[0].columnName,
      });
    };
    this.onOver = ({ clientOffset }) => {
      const { onDraftGroup, groupingPanelItems } = this.props;
      const { sourceColumnName, targetColumnIndex: prevTargetColumnIndex } = this.state;
      const itemGeometries = this.itemRefs.map(element => element.getBoundingClientRect());
      const sourceColumnIndex = groupingPanelItems
        .findIndex(column => column.name === sourceColumnName);
      const targetColumnIndex = getGroupCellTargetIndex(
        itemGeometries,
        sourceColumnIndex,
        clientOffset,
      );

      if (prevTargetColumnIndex === targetColumnIndex) return;

      onDraftGroup({
        columnName: sourceColumnName,
        groupIndex: targetColumnIndex,
      });
      this.setState({ targetColumnIndex });
    };
    this.onLeave = () => {
      const { onDraftGroup, groupingPanelItems } = this.props;
      const { sourceColumnName } = this.state;
      const sourceItem = groupingPanelItems.filter(item =>
        item.column.name === sourceColumnName)[0];
      if (sourceItem && sourceItem.draft === GROUP_ADD_MODE) {
        this.resetState();
        return;
      }
      onDraftGroup({
        columnName: sourceColumnName,
        groupIndex: -1,
      });
      this.setState({
        targetColumnIndex: -1,
      });
    };
    this.onDrop = () => {
      const { onGroup } = this.props;
      const { sourceColumnName, targetColumnIndex } = this.state;
      this.resetState();
      onGroup({
        columnName: sourceColumnName,
        groupIndex: targetColumnIndex,
      });
    };
    this.onDragEnd = () => {
      const { sourceColumnName, targetColumnIndex } = this.state;
      const { onGroup } = this.props;
      if (sourceColumnName && targetColumnIndex === -1) {
        onGroup({
          columnName: sourceColumnName,
        });
      }
      this.resetState();
    };
  }

  getItems() {
    const {
      groupingPanelItems,
      groupPanelItemComponent: Item,
      allowDragging,
    } = this.props;

    this.itemRefs = [];
    return groupingPanelItems.map((item) => {
      const itemElement = (
        <Item
          item={item}
        />
      );

      return allowDragging
        ? (
          <DragSource
            key={item.column.name}
            getPayload={() => [{ type: 'column', columnName: item.column.name }]}
            onEnd={this.onDragEnd}
          >
            <div
              ref={element => element && this.itemRefs.push(element)}
              style={{ display: 'inline-block' }}
            >
              {itemElement}
            </div>
          </DragSource>
        )
        : (
          <div
            ref={element => element && this.itemRefs.push(element)}
            key={item.column.name}
            style={{ display: 'inline-block' }}
          >
            {itemElement}
          </div>
        );
    });
  }

  resetState() {
    const { onCancelDraftGroup } = this.props;
    onCancelDraftGroup();
    this.setState({
      sourceColumnName: null,
      targetColumnIndex: -1,
    });
  }

  render() {
    const {
      groupByColumnText,
      panelComponent: Panel,
      allowDragging,
    } = this.props;

    const items = this.getItems();

    const groupPanel = (
      items.length
        ? <Panel>{items}</Panel>
        : <span>{groupByColumnText}</span>
    );

    return allowDragging
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
  groupingPanelItems: PropTypes.arrayOf(PropTypes.shape({
    column: PropTypes.object,
    draft: PropTypes.string,
  })).isRequired,
  onGroup: PropTypes.func,
  groupByColumnText: PropTypes.any,
  groupPanelItemComponent: PropTypes.func.isRequired,
  panelComponent: PropTypes.func.isRequired,
  allowDragging: PropTypes.bool,
  onDraftGroup: PropTypes.func,
  onCancelDraftGroup: PropTypes.func,
};

GroupPanelLayout.defaultProps = {
  onGroup: () => {},
  groupByColumnText: undefined,
  allowDragging: false,
  onDraftGroup: () => {},
  onCancelDraftGroup: () => {},
};
