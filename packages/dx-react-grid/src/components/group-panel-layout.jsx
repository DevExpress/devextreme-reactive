import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DropTarget } from '@devexpress/dx-react-core';
import {
  GROUP_ADD_MODE,
  getGroupCellTargetIndex,
} from '@devexpress/dx-grid-core';
import { ItemLayout } from './group-panel-layout/item-layout';

export class GroupPanelLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sourceColumnName: null,
      targetItemIndex: -1,
    };

    this.onEnter = ({ payload }) => {
      this.setState({
        sourceColumnName: payload[0].columnName,
      });
    };
    this.onOver = ({ clientOffset }) => {
      const { onDraftGroup, items } = this.props;
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

      onDraftGroup({
        columnName: sourceColumnName,
        groupIndex: targetItemIndex,
      });
      this.setState({ targetItemIndex });
    };
    this.onLeave = () => {
      const { onDraftGroup, items } = this.props;
      const { sourceColumnName } = this.state;
      const sourceItem = items.filter(({ column }) => column.name === sourceColumnName)[0];
      if (sourceItem && sourceItem.draft === GROUP_ADD_MODE) {
        this.resetState();
        return;
      }
      onDraftGroup({
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
    this.onDragEnd = () => {
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
    const { onCancelDraftGroup } = this.props;
    onCancelDraftGroup();
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
      allowDragging,
    } = this.props;

    this.itemRefs = [];

    const groupPanel = (items.length ? (
      <Container>
        {items.map(item => (
          <ItemLayout
            key={item.column.name}
            ref={element => element && this.itemRefs.push(element)}
            item={item}
            itemComponent={Item}
            allowDragging={allowDragging}
            onDragEnd={this.onDragEnd}
          />
        ))}
      </Container>
    ) : (
      <EmptyMessage />
    ));

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
  items: PropTypes.arrayOf(PropTypes.shape({
    column: PropTypes.object,
    draft: PropTypes.string,
  })).isRequired,
  onGroup: PropTypes.func,
  itemComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  emptyMessageComponent: PropTypes.func.isRequired,
  allowDragging: PropTypes.bool,
  onDraftGroup: PropTypes.func,
  onCancelDraftGroup: PropTypes.func,
};

GroupPanelLayout.defaultProps = {
  onGroup: () => {},
  allowDragging: false,
  onDraftGroup: () => {},
  onCancelDraftGroup: () => {},
};
