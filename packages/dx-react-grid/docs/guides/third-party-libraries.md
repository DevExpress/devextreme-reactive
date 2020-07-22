# React Grid - Compatibility with third-party libraries

The Grid components are compilable with other third-party libraries. Examples are shown below created using different React libraries.

Before you start, review the following help topics:

- [Core Concepts](../../../core/docs/guides/fundamentals.md)
- [Custom Plugin Development](./custom-plugin-development.md)

## Row Reordering

The demos below use the following libraries:
- [react-sortable-hoc](https://www.npmjs.com/package/react-sortable-hoc) - a set of higher-order components to turn any list into an animated, accessible and touch-friendly sortable list
- [array-move](https://www.npmjs.com/package/array-move) - move an array item to a different position

### Simple Row Reordering

You may wrap components into higher-order components from `react-sortable-hoc` library. Thus, you can reorder rows using UI controls. The following demo shows base implementation of row reordering:

.embedded-demo({ "path": "grid-row-reordering/basic", "showThemeSelector": true })

### Tree Data Row Reordering

These components are also suitable for [Tree Data](./tree-data.md). For this, you should take into account a few important points.

Firstly, you need to create simple plugin to be able get row in displayed order after the formation of the tree data. This plugin above should be placed after [CustomTreeData](../reference/custom-tree-data.md) plugin.

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

Secondly, when you use [Tree Data](./tree-data.md) each row should be able to change parent. Also, you in some cases you have row array without parents. In this case, you may need to make a one row the children of another row. In demo below, you can do this by click on reordering control:

.embedded-demo({ "path": "grid-row-reordering/tree", "showThemeSelector": true })
