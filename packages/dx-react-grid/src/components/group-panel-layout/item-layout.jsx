import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DragSource } from '@devexpress/dx-react-core';

export class ItemLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
  }

  render() {
    const {
      item,
      itemComponent: Item,
      draggingEnabled,
      onDragStart,
      onDragEnd,
    } = this.props;
    const { dragging } = this.state;

    const itemElement = <Item item={{ ...item, draft: dragging || item.draft }} />;

    return (draggingEnabled ? (
      <DragSource
        payload={[{ type: 'column', columnName: item.column.name }]}
        onStart={() => {
          this.setState({ dragging: true });
          onDragStart();
        }}
        onEnd={() => {
          this.setState({ dragging: false });
          onDragEnd();
        }}
      >
        {itemElement}
      </DragSource>
    ) : (
      itemElement
    ));
  }
}

ItemLayout.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.object,
    draft: PropTypes.bool,
  }).isRequired,
  itemComponent: PropTypes.func.isRequired,
  draggingEnabled: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
};

ItemLayout.defaultProps = {
  draggingEnabled: false,
  onDragStart: () => {},
  onDragEnd: () => {},
};
