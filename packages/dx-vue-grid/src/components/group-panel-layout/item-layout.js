export const ItemLayout = {
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      item,
      itemComponent: Item,
    } = this;
    return <Item item={{ ...item }} />;
  },
};
