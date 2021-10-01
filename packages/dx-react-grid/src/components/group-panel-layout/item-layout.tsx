import * as React from 'react';
import { DragSource } from '@devexpress/dx-react-core';
import { GroupingPanel as GP } from '../../types';

const defaultProps = {
  draggingEnabled: false,
  onDragStart: () => {},
  onDragEnd: () => {},
};
type GPItemLayoutProps = GP.GroupingItemLayoutProps & typeof defaultProps;

// tslint:disable-next-line: max-line-length
export class ItemLayout extends React.PureComponent<GPItemLayoutProps, GP.GroupingItemLayoutState> {
  static defaultProps = defaultProps;

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
      itemRef,
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
        ref={itemRef}
      >
        {itemElement}
      </DragSource>
    ) : (
      itemElement
    ));
  }
}
