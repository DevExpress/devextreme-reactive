# React Grid - Row Reordering

Before you start, review the following help topics:

- [Core Concepts](../../../core/docs/guides/fundamentals.md)
- [Custom Plugin Development](./custom-plugin-development.md)

The demos below use the following libraries:
- [react-sortable-hoc](https://www.npmjs.com/package/react-sortable-hoc) - a set of higher-order components to turn any list into an animated, accessible and touch-friendly sortable list
- [array-move](https://www.npmjs.com/package/array-move) - move an array item to a different position

## Simple Row Reordering

You may wrap components into higher-order components from `react-sortable-hoc` library. Thus, you can reorder rows using UI controls. The following demo shows base implementation of row reordering:

.embedded-demo({ "path": "grid-row-reordering/basic", "showThemeSelector": true })

## Tree Data Row Reordering

These components are also suitable for [Tree Data](./tree-data.md). For this, you should take into account a few important points.

Please note, that you need to create simple plugin to be able get row in displayed order after the formation of the tree data. This plugin above should be placed after [CustomTreeData](../reference/custom-tree-data.md) plugin.

```jsx
const handleOrderedRows = handleRows => ({ rows }) => {
  setTimeout(() => handleRows(rows));
  return rows;
};

const OrderedRowProvider = ({ handleRows }) => (
  <Plugin
    name="OrderedRowProvider"
    dependencies={[{ name: 'CustomTreeData' }]}
  >
    <Getter name="rows" computed={handleOrderedRows(handleRows)} />
  </Plugin>
);
```

You can view the demo and the full code below:

.embedded-demo({ "path": "grid-row-reordering/tree", "showThemeSelector": true })
