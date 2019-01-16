# React Grid - Custom Plugin Development


## Table of Contents
1. [Introduction](#introduction)
2. [Render Custom Markup](#render-custom-markup)
3. [Share Values Between Plugins](#share-values-between-plugins)
4. [Use the Functionality of Built-In Plugins](#use-the-functionality-of-built-in-plugins)
5. [Final Steps](#final-steps)


## Introduction

This tutorial is aimed at advanced users who are familiar with [basic Grid concepts](./getting-started.md) and who want to add new functionality to the Grid by using the [React Core](../../../core/docs/guides/fundamentals.md) components.

In our particular case, we will extend the Grid's toolbar with a select box that will allow users to filter the grid by a required column. The purpose of the tutorial is not to implement a very useful feature. The main idea is to show how to add to the Grid component functionality that is not provided out of the box.

The initial code is shown below. As you can see, we will use the Grid in the `Material-UI` theme.

*index.js:*
```jsx
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import service from './data.js';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "ID", title: "ID" },
        { name: "CompanyName", title: "Company Name" },
        { name: "Address", title: "Address" },
        { name: "City", title: "City" },
        { name: "State", title: "State" },
        { name: "Zipcode", title: "Zip code" }
      ],
      rows: service.getCustomers()
    };
  }
  render() {
    const { rows, columns } = this.state;
    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table />
          <TableHeaderRow />
          <Toolbar />
        </Grid>
      </Paper>
    );
  }
}
```
*data.js:*
```js
const customers = [{
    ID: 1,
    CompanyName: 'Super Mart of the West',
    Address: '702 SW 8th Street',
    City: 'Bentonville',
    State: 'Arkansas',
    Zipcode: 72716
  }, {
    ID: 2,
    CompanyName: 'Electronics Depot',
    Address: '2455 Paces Ferry Road NW',
    City: 'Atlanta',
    State: 'Georgia',
    Zipcode: 30339
  }, {
    ID: 3,
    CompanyName: 'K&S Music',
    Address: '1000 Nicllet Mall',
    City: 'Minneapolis',
    State: 'Minnesota',
    Zipcode: 55403
  }, {
    ID: 4,
    CompanyName: "Tom's Club",
    Address: '999 Lake Drive',
    City: 'Issaquah',
    State: 'Washington',
    Zipcode: 98027
  }, {
    ID: 5,
    CompanyName: 'E-Mart',
    Address: '3333 Beverly Rd',
    City: 'Hoffman Estates',
    State: 'Illinois',
    Zipcode: 60179
  }];

export default {
  getCustomers() {
    return customers;
  }
}
```

Take a look at the image below to see what we will get after the tutorial is finished:

<p align="center">
  <img class="img-responsive" src="../../../../../img/guides/custom-plugin-development/result.png">
</p>

At the top right corner, you can see a select box. When a user selects an item from it, the grid displays only the filtered rows. When the value is cleared using the `CLEAR` button, the grid displays all available rows.

Let's start extending our grid!

## Render Custom Markup

To render custom markup in an existing UI element of the Grid (toolbar in our case), we need to create a plugin. Wrap the custom markup in the [Plugin](../../../core/docs/reference/plugin.md) component to do this. Since our plugin will be part of the toolbar, `ToolbarFilter` is a suitable name for it.

Let's create a new folder called `plugins` in our project and add a new file, `toolbar-filter.js`, with the following code to it:

*toolbar-filter.js:*
```jsx
import {
  Plugin
} from '@devexpress/dx-react-core';

export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        name="ToolbarFilter"
      >
      </Plugin>
    );
  }
}
```

As it was mentioned above, our plugin will be part of the Grid's [toolbar](../reference/toolbar.md). According to the documentation, the toolbar exports a [template](../../../core/docs/reference/template.md) with the `toolbarContent` name. Add the [Template](../../../core/docs/reference/template.md) component to our plugin and set its `name` to `toolbarContent`:

```jsx
...
import {
  ...,
  Template
} from '@devexpress/dx-react-core';

export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        ...
      >
        <Template name="toolbarContent" />
      </Plugin>
    );
  }
}
```

We do not want to *replace* the default toolbar content. Rather we should *append* our content to it. To do this, add the [TemplatePlaceholder](../../../core/docs/reference/template-placeholder.md) component without parameters to the template:

```jsx
...
import {
  ...,
  TemplatePlaceholder
} from '@devexpress/dx-react-core';

export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        ...
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
        </Template>
      </Plugin>
    );
  }
}
```

Our plugin should not work without the [Toolbar](../reference/toolbar.md) plugin because we use its template. Specify the `dependencies` property to notify our plugin about it:

```jsx
...

const pluginDependencies = [
  { name: "Toolbar" }
];

export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        ...
        dependencies={pluginDependencies}
      >
        ...
      </Plugin>
    );
  }
}
```

Now, all is set to add custom markup to the `toolbarContent` template. Since we are going to display a select box, let's add the [Select](https://material-ui.com/demos/selects/) component to our template:

```jsx
...
import Select from '@material-ui/core/Select';

export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        ...
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <Select value="" />
        </Template>
      </Plugin>
    );
  }
}
```
It is time to add our plugin to the Grid:

*index.js:*
```jsx
...
import { ToolbarFilter } from './plugins/toolbar-filter.js';

class App extends Component {
  ...
  render() {
    const { rows, columns } = this.state;
    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table />
          <TableHeaderRow />
          <Toolbar />
          <ToolbarFilter />
        </Grid>
      </Paper>
    );
  }
}
```
After you've done that, the Grid should look as follows:
<p align="center">
  <img class="img-responsive" src="../../../../../img/guides/custom-plugin-development/add-select.png">
</p>

## Share Values Between Plugins

We see our select box, but it does nothing. The next step we should perform is to add items to our select box. These items should represent unique values of a particular column by which we want to filter our grid. The `ToolbarFilter` plugin represents a UI [plugin](./plugin-overview.md). This plugin should only render content based on provided data. But it should not manipulate the Grid's state or modify data. For this task, we need to implement an extra plugin called [state management](./plugin-overview.md) plugin. This plugin will prepare all necessary information for our `ToolbarFilter` plugin. Let's name it `ToolbarFilterState`. So, add a new `toolbar-filter-state.js` file to the `plugins` folder of our project and implement the logic of a new plugin in it.

*file toolbar-filter-state.js:*
```jsx
import * as React from 'react';
import {
    Plugin
} from '@devexpress/dx-react-core';

export class ToolbarFilterState extends React.PureComponent {
  render() {
    return (
      <Plugin
        name="ToolbarFilterState"
      >
      </Plugin>
    );
  }
}
```

Now we need to specify by which column we wish to filter our grid. The "columnName" option is appropriate for this task. Since we are not going to implement [controlled](./controlled-and-uncontrolled-modes.md) mode for this plugin add the `default` prefix to the property name according to the naming convention. So, the final name will be `defaultColumnName`.

In addition, to the `defaultColumnName` property, let's add the `defaultFilterValue` property to allow a user to apecify initial filter value. When a user selects a value in our select box, this value will be changed. In this case, save it in the state object of our component as shown below:

*file toolbar-filter-state.js:*
```jsx
...

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: this.props.defaultFilterValue
    };
    ...
  }

  render() {
    ...
  }
}
```
In our scenario, we are going to filter the grid by the `CompanyName` column. The default filter value should be set to an empty string which means that the grid should not fitler items initially. So, we can add this plugin to our grid. Since it is a state management plugin it should be included before UI plugins. See [React Grid - Plugin Overview](./plugin-overview.md).

*index.js:*
```jsx
...
import {ToolbarFilterState} from './plugins/toolbar-filter-state.js';

class App extends Component {
  ...
  render() {
    ...
    return (
      <Paper>
        <Grid
          ...
        >
          <ToolbarFilterState defaultColumnName="CompanyName" defaultFilterValue="" />
          <Table />
          <TableHeaderRow />
          <Toolbar />
          <ToolbarFilter />
        </Grid>
      </Paper>
    );
  }
}
```
We added the `ToolbarFilterState` plugin but nothing has changed and the select box still does nothing. The next task is to get unique values of the `CompanyName` column and pass these values to `ToolbarFilter` for displaying. If we want to share data between plugins, we need to use [getters](../../../core/docs/reference/getter.md).

How can we get values of a particular column? We set data items using the `rows` property of the [Grid](../reference/grid.md) plugin. This plugin exports the `rows` getter. We can use it in our case. However, we will need to pass data items to our UI plugin (`ToolbarFilter`). So, we will declare a new getter for this task and name it `toolbarFilterDataItems`. The value of this getter will be calculated based on the value of the `rows` getter. For this task we will need to use computed functions. These functions calculate values based on values of other getters. As you remember, we will need not only filter our grid, but display the filtered column name near the select box. Since we are going to do that in the `ToolbarFilter` plugin we will need to get the column name in the plugin. A new getter will help us do this. Let's name it `toolbarFilterColumnName`. Moreover, we will use this getter for calculating a value for `toolbarFilterDataItems`. Add a new calculated function named, for example, `filterDataItemsComputed` that accepts the `rows` and `toolbarFilterColumnName` getters and calculates items for our select box. Our code might be as follows:


*file toolbar-filter-state.js:*
```jsx
...
import {
    ..., Getter
} from '@devexpress/dx-react-core';

const filterDataItemsComputed = ({rows, toolbarFilterColumnName}) => {
  return rows.reduce((acc, row) => {
    if(!acc.includes(row[toolbarFilterColumnName])) {
      acc.push(row[toolbarFilterColumnName]);
    }
    return acc;
  }, []);
}

export class ToolbarFilterState extends React.PureComponent {
  ...
  render() {
    return (
      <Plugin
        name="ToolbarFilterState"
      >
        <Getter name="toolbarFilterColumnName" value={this.props.defaultColumnName} />
        <Getter name="toolbarFilterDataItems" computed={filterDataItemsComputed} />
      </Plugin>
    );
  }
}
```

Note, that the getters order is very important. All computed getters that depends on value getters should be included after the value getters. That is why we added `toolbarFilterColumnName` before `toolbarFilterDataItems`.

To get `toolbarFilterDataItems` in the `ToolbarFilter` plugin and render items, we need to use [TemplateConnector](../../../core/docs/reference/template-connector.md) as shown below:

*toolbar-filter.js:*
```jsx
import {
  ...,
  TemplateConnector
} from '@devexpress/dx-react-core';

export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        ...
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
          {({
              toolbarFilterDataItems
            }) => (
              <Select>
                {toolbarFilterDataItems.map((item, index) =>
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                )}
              </Select>
          )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
```

Then, we will need to share the `defaultFilterValue` property value of the `ToolbarFilter` plugin. We can do that using an extra getter. Let's name it `toolbarFilterValue`. Moreover, now the `ToolbarFilter` plugin depends on the
`ToolbarFilterState` plugin. Modify our plugins accordingly:

*file toolbar-filter-state.js:*
```jsx
...

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    super(props);
      ...
      this.state = {
        filterValue: this.props.defaultFilterValue
      };
  }
  ...
  render() {
    const { filterValue } = this.state;
    return (
      <Plugin
        name="ToolbarFilterState"
      >
        ...
        <Getter name="toolbarFilterValue" value={filterValue} />
      </Plugin>
    );
  }
}
```

*toolbar-filter.js:*
```jsx
...
const pluginDependencies = [
  ...,
  { name: "ToolbarFilterState" }
];

export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        ...
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
          {({
            toolbarFilterValue,
            ...
            }) => (
              <Select
                value={toolbarFilterValue}
              >
                ...
              </Select>
          )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
```

## Use the Functionality of Built-In Plugins

We need to determine when a value is changed and filter the grid based on the value. We store the `filterValue` property in state object of the `ToolbarFilterState` plugin. However, the UI element that affects this value is rendered by the `ToolbarFilter` plugin. How can we detect changes in one plugin and change the required value in the state object of another plugin? We need to use an [action](../../../core/docs/reference/action.md). Let's name it `changeToolbarFilterValue`.

*file toolbar-filter-state.js:*
```jsx
...
import {
    ..., Action
} from '@devexpress/dx-react-core';

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    super(props);
    ...
    this.state = {
      filterValue: this.props.defaultFilterValue
    };
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue() {
  }

  render() {
    return (
      <Plugin
        name="ToolbarFilterState"
      >
        <Action name="changeToolbarFilterValue" action={this.changeValue} />
      </Plugin>
    );
  }
}
```
Now, `changeToolbarFilterValue` is available in any plugin that is used with `ToolbarFilterState`. In our scenario, we may get it using [TemplateConnector](../../../core/docs/reference/template-connector.md) in the `ToolbarFilter` plugin. The following code snippet shows how to get the `changeToolbarFilterValue` action and use it as the `Select.onChange` event handler.

*toolbar-filter.js:*
```jsx
...
export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        ...
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
          {({
            ... //Accessing getters
           }, {
            changeToolbarFilterValue //Accessing actions
          }) => (
            <Select
              ...
              onChange={changeToolbarFilterValue}
            >
              ...
            </Select>
          )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
```

The event handler passes the `event` parameter. We can get a new value using this parameter and pass it to the state object of the `ToolbarFilterState` plugin.

*file toolbar-filter-state.js:*
```jsx
...
export class ToolbarFilterState extends React.PureComponent {
  ...
  changeValue(event) {
    this.setState({
      filterValue: event.target.value
    });
  }
  ...
}
```

We managed to detect changes in the select box. However, it is not sufficient for filtering the grid. We will need to add the [IntegratedFiltering](../reference/integrated-filtering.md) plugin that performs built-in data filtering. If we take a look at the plugin description, we will see that there is the `filterExpression` getter that represents a filter expression that will be used for filtering. So, we will redefine the value of `filterExpression` using a computed function to extend the expression with our selected value.

*index.js:*
```jsx
...
import {
  IntegratedFiltering
} from '@devexpress/dx-react-grid';

class App extends Component {
  ...
  render() {
    ...
    return (
      <Paper>
        <Grid
          ...
        >
          <ToolbarFilterState defaultColumnName="CompanyName" defaultFilterValue=""/>
          <IntegratedFiltering />
          <Table />
          <TableHeaderRow />
          <Toolbar />
          <ToolbarFilter />
        </Grid>
      </Paper>
    );
  }
}
```

*file toolbar-filter-state.js:*
```jsx
...

const filterExpressionComputed = ({ filterExpression, toolbarFilterValue, toolbarFilterColumnName }) => {
    const newFilterExpression = { ...filterExpression || { filters: [], operator: "and" } };
    if (toolbarFilterValue) {
      newFilterExpression.filters.push({
        columnName: toolbarFilterColumnName,
        value: toolbarFilterValue
      });
    }
    return newFilterExpression;
}

export class ToolbarFilterState extends React.PureComponent {
  ...
  render() {
    ...
    return (
      <Plugin
        name="ToolbarFilterState"
      >
        ...
        <Getter name="filterExpression" computed={filterExpressionComputed} />
      </Plugin>
    );
  }
}
```

Now our grid can filter items by the `CompanyName` column.



## Final Steps

Let's complete this task by displaying the current column caption near the select box and adding the `Clear` button for clearing the selected value. For this task we will perform the following steps:

* Declare the `clearToolbarFilterValue` action in the `ToolbarFilterState` plugin and clear the `filterValue` state property in the action.
* Add the `Button` widget near the select box in the `ToolbarFilter` plugin and use the `clearToolbarFilterValue` action as the `onClick` event handler.
* Get the `toolbarFilterColumnName` getter value in the `ToolbarFilterState` plugin.
* Since we want to get a caption of the `CompanyName` column, we will need to find the required column by its name and get the caption. For this task we will get the `columns` getter value that is exported by the [Grid](../reference/grid.md) plugin.

The following code snippets show this approach in action:
*file toolbar-filter-state.js:*
```jsx
...

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    super(props);
    ...
    this.columnName = this.props.defaultColumnName || null;
    this.clearValue = this.clearValue.bind(this);
  }

  clearValue() {
    this.setState({
      filterValue: ""
    });
  }

  render() {
    ...
    return (
      <Plugin
        name="ToolbarFilterState"
      >
        ...
        <Action name="clearToolbarFilterValue" action={this.clearValue} />
      </Plugin>
    );
  }
}
```

*toolbar-filter.js:*
```jsx
...
const getColumnTitle = (columns, toolbarFilterColumnName) => {
  const column = columns.find(col => col.name === toolbarFilterColumnName);
  return column ? column.title : "";
}
export class ToolbarFilter extends React.PureComponent {
  render() {
    return (
      <Plugin
        ...
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
          {({
              ...,
              toolbarFilterColumnName,
              columns
            }, {
              ...,
              clearToolbarFilterValue
            }) => (
              <div>
                <InputLabel htmlFor="filter-field">{getColumnTitle(columns, toolbarFilterColumnName)}:</InputLabel>
                  ...
                <Button onClick={clearToolbarFilterValue}>Clear</Button>
              </div>
          )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
```

That's it.

[Here](https://codesandbox.io/s/0ymwn2lm8w) you will find the full project with custom plugins.
