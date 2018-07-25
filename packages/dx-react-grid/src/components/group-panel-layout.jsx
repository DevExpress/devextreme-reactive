import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DropTarget } from '@devexpress/dx-react-core';
import { getGroupCellTargetIndex } from '@devexpress/dx-grid-core';
import { ItemLayout } from './group-panel-layout/item-layout';

export class GroupPanelLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sourceColumnName: null,
      targetItemIndex: -1,
    };
    this.handleDragEvent = (eventHandler, { payload, ...restArgs }) => {
      const { isColumnGroupingEnabled } = this.props;
      const { columnName } = payload[0];

      if (isColumnGroupingEnabled(columnName)) {
        eventHandler({ payload, ...restArgs });
      }
    };
    this.onEnter = ({ payload }) => {
      this.setState({
        sourceColumnName: payload[0].columnName,
      });
    };
    this.onOver = ({ clientOffset }) => {
      const { onGroupDraft, items } = this.props;
      const { sourceColumnName, targetItemIndex: prevTargetItemIndex } = this.state;
      // eslint-disable-next-line react/no-find-dom-node
      const itemGeometries = this.itemRefs.map(ref => findDOMNode(ref).getBoundingClientRect());
      const sourceItemIndex = items.findIndex(({ column }) => column.name === sourceColumnName);
      const targetItemIndex = getGroupCellTargetIndex(
        itemGeometries,
        sourceItemIndex,
        clientOffset,
      );

      if (prevTargetItemIndex === targetItemIndex) return;

      onGroupDraft({
        columnName: sourceColumnName,
        groupIndex: targetItemIndex,
      });
      this.setState({ targetItemIndex });
    };
    this.onLeave = () => {
      const { onGroupDraft } = this.props;
      const { sourceColumnName } = this.state;
      if (!this.draggingColumnName) {
        this.resetState();
        return;
      }
      onGroupDraft({
        columnName: sourceColumnName,
        groupIndex: -1,
      });
      this.setState({
        targetItemIndex: -1,
      });
    };
    this.onDrop = () => {
      const { onGroup } = this.props;
      const { sourceColumnName, targetItemIndex } = this.state;
      this.resetState();
      onGroup({
        columnName: sourceColumnName,
        groupIndex: targetItemIndex,
      });
    };
    this.onDragStart = (columnName) => {
      this.draggingColumnName = columnName;
    };
    this.onDragEnd = () => {
      this.draggingColumnName = null;
      const { sourceColumnName, targetItemIndex } = this.state;
      const { onGroup } = this.props;
      if (sourceColumnName && targetItemIndex === -1) {
        onGroup({
          columnName: sourceColumnName,
        });
      }
      this.resetState();
    };
  }

  resetState() {
    const { onGroupDraftCancel } = this.props;
    onGroupDraftCancel();
    this.setState({
      sourceColumnName: null,
      targetItemIndex: -1,
    });
  }

  render() {
    const {
      items,
      emptyMessageComponent: EmptyMessage,
      containerComponent: Container,
      itemComponent: Item,
      draggingEnabled,
      isColumnGroupingEnabled,
    } = this.props;

    this.itemRefs = [];

    const groupPanel = (items.length ? (
      <Container>
        {items.map((item) => {
          const { name: columnName } = item.column;
          return (
            <ItemLayout
              key={columnName}
              ref={element => element && this.itemRefs.push(element)}
              item={item}
              itemComponent={Item}
              draggingEnabled={draggingEnabled && isColumnGroupingEnabled(columnName)}
              onDragStart={() => this.onDragStart(columnName)}
              onDragEnd={this.onDragEnd}
            />
          );
        })}
      </Container>
    ) : (
      <EmptyMessage />
    ));

    return draggingEnabled
      ? (
        <DropTarget
          onEnter={args => this.handleDragEvent(this.onEnter, args)}
          onOver={args => this.handleDragEvent(this.onOver, args)}
          onLeave={args => this.handleDragEvent(this.onLeave, args)}
          onDrop={args => this.handleDragEvent(this.onDrop, args)}
        >
          {groupPanel}
        </DropTarget>
      )
      : groupPanel;
  }
}

GroupPanelLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    column: PropTypes.object,
    draft: PropTypes.bool,
  })).isRequired,
  onGroup: PropTypes.func,
  itemComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  emptyMessageComponent: PropTypes.func.isRequired,
  draggingEnabled: PropTypes.bool,
  isColumnGroupingEnabled: PropTypes.func,
  onGroupDraft: PropTypes.func,
  onGroupDraftCancel: PropTypes.func,
};

GroupPanelLayout.defaultProps = {
  onGroup: () => {},
  draggingEnabled: false,
  isColumnGroupingEnabled: () => {},
  onGroupDraft: () => {},
  onGroupDraftCancel: () => {},
};
