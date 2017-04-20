# DataGrid Virtual Scrolling

## Overview

The DataGrid component can handle a large amount of data passed to it. In some cases, it may be required to show thousands of records. As an alternative to paging with hundreds of pages, we porivide the virtual mode for data presentation.

## Plugin List

The `VirtualTableView` plugin is available for the Bootstrap 3 theme. It can be used as an alternative to the `TableView` plugin.

There are no base plugins that implement virtual scrolling. It is designed as an alternative to an ordinary table template for the [TableView](table-view.md) plugin.

Note that the [plugin order](../README.md#plugin-order) is very important.

## Basic Setup

The following example demonstrates the basic DataGrid with the virtual scrolling setup:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/virtual-scrolling/basic)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/virtual-scrolling/basic.jsx)

## Integration with Other Plugins

A virtual table also operates with other DataGrid features like filtering, sorting, etc. Here is an example:

[DEMO](http://devexpress.github.io/devextreme-reactive/react/datagrid/demos/#/virtual-scrolling/integration-with-other-plugins)

[SOURCE](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/bootstrap3/virtual-scrolling/integration-with-other-plugins.jsx)


