import { ItemLayout } from './group-panel-layout/item-layout';

export const GroupPanelLayout = {
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemComponent: {
      type: Object,
      required: true,
    },
    containerComponent: {
      type: Object,
      required: true,
    },
    emptyMessageComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      items,
      emptyMessageComponent: EmptyMessage,
      containerComponent: Container,
      itemComponent: Item,
    } = this;

    const groupPanel = (items.length ? (
      <Container>
        {items.map((item) => {
          const { name: columnName } = item.column;
          return (
            <ItemLayout
              key={columnName}
              item={item}
              itemComponent={Item}
            />
          );
        })}
      </Container>
    ) : (
      <EmptyMessage />
    ));

    return groupPanel;
  },
};
