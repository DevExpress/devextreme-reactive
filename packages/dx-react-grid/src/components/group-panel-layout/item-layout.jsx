import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from '@devexpress/dx-react-core';

export class ItemLayout extends React.PureComponent {
  render() {
    const {
      item,
      itemComponent: Item,
      draggingEnabled,
      onDragEnd,
    } = this.props;

    return (draggingEnabled ? (
      <DragSource
        getPayload={() => [{ type: 'column', columnName: item.column.name }]}
        onEnd={onDragEnd}
      >
        <Item item={item} />
      </DragSource>
    ) : (
      <Item item={item} />
    ));
  }
}

ItemLayout.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.object,
    draft: PropTypes.string,
  }).isRequired,
  itemComponent: PropTypes.func.isRequired,
  draggingEnabled: PropTypes.bool,
  onDragEnd: PropTypes.func,
};

ItemLayout.defaultProps = {
  draggingEnabled: false,
  onDragEnd: () => {},
};
