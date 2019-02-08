import * as React from 'react';
import { DragSource } from '@devexpress/dx-react-core';
import { GroupingPanel as GP } from '../../types';

// tslint:disable-next-line: max-line-length
export class ItemLayout extends React.PureComponent<GP.GroupingItemLayoutProps, GP.GroupingItemLayoutState> {
  static defaultProps: Partial<GP.GroupingItemLayoutProps>;

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
          onDragStart!();
        }}
        onEnd={() => {
          this.setState({ dragging: false });
          onDragEnd!();
        }}
      >
        {itemElement}
      </DragSource>
    ) : (
      itemElement
    ));
  }
}

ItemLayout.defaultProps = {
  draggingEnabled: false,
  onDragStart: () => {},
  onDragEnd: () => {},
};
