# DataGrid Selection

## Introduction

DataGrid allows users to select/deselect rows. It seamlessly integrates with paging, sorting, filtering and grouping.

## Plugin List

There are several plugins that implement selection. Here is the list:
- [SelectionState](../reference/selection-state.md)
- [TableSelection](../reference/table-selection.md)

Note that [plugin order](../README.md#plugin-order) is very important.

## Basic setup

The following example demonstrates the basic DataGrid selection setup:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/selection/basic)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/selection/basic.jsx)

As you can see, in this example we use controlled mode by specifying the `selection` and `selectionChange` options for the `SelectionState` plugin.

## Select by Row Click

By default, rows can be selected by ticking a check box. In some cases, it may be convenient to allow users to select rows by clicking on the whole item. The following example demonstrates this scenario:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/selection/select-by-row-click)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/selection/select-by-row-click.jsx)

In some scenarios, it is useful to hide check boxes completely and highlight selected rows. Here is a demo:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/selection/hidden-checkboxes)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/selection/hidden-checkboxes.jsx)

## Select All

If your DataGrid configuration has the `TableHeaderRow` plugin, you can see a check box inside a header row. This check box provides a capability to select/deselect all rows.

### Without Paging

In the following example, we are using TableView with virtual mode. It allow us to demonstrate the Select All behavior with multiple rows:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/selection/select-all-virtual)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/selection/select-all-virtual.jsx)

### With Paging

If you are using the `LocalPaging` plugin, it is easy to integrate the Select All behavior with the `PagingState` plugin.

In the following example, we have implemented the Select All behavior within a visible page. You can achieve this result by placing the `SelectionState` plugin after `LocalPaging`:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/selection/select-all-by-page)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/selection/select-all-by-page.jsx)

If you place the `SelectionState` plugin before `LocalPaging`, it will be possible to select rows on all pages:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/selection/select-all-by-all-pages)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/selection/select-all-by-all-pages.jsx)

### Hidden Select All

It is also possible to hide the Select All check box:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/selection/hidden-select-all)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/selection/hidden-select-all.jsx)

