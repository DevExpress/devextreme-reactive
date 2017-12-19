import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from '@devexpress/dx-react-core';

export class ItemLayout extends React.PureComponent {
  render() {
    const {
      item,
      itemComponent: Item,
      allowDragging,
      onDragEnd,
    } = this.props;

    return (allowDragging ? (
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
  allowDragging: PropTypes.bool,
  onDragEnd: PropTypes.func,
};

ItemLayout.defaultProps = {
  allowDragging: false,
  onDragEnd: () => {},
};
