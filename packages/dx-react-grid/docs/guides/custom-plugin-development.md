# React Grid - Custom Plugin Development


## Table of Contents
1. [Introduction](#introduction)
2. [Render Custom Markup](#render-custom-markup)
3. [Share Values Between Plugins](#share-values-between-plugins)
4. [Use the Functionality of Built-In Plugins](#use-the-functionality-of-built-in-plugins)
5. [Final Steps](#final-steps)


## Introduction

This tutorial is aimed at advanced users who are familiar with [basic Grid concepts](./getting-started.md) and who want to add new functionality to the Grid by using the [React Core](../../../core/docs/guides/fundamentals.md) components.

In this tutorial, we add to the Grid's toolbar a select box that filters the grid by a predefined column. The purpose of the tutorial is not to implement a valuable feature but to show how to extend the Grid's functionality.

We start with the following code. As you can see, we use the Grid in the `Material-UI` theme.

*index.js:*
```jsx
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import customers from "./data.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'ID', title: 'ID' },
        { name: 'CompanyName', title: 'Company Name' },
        { name: 'Address', title: 'Address' },
        { name: 'City', title: 'City' },
        { name: 'State', title: 'State' },
        { name: 'Zipcode', title: 'Zip code' }
      ],
      rows: customers
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
export default [{
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
```

Take a look at the image below to see what you will get by the end of the tutorial. At the top right corner, you can see a select box. When a user selects a value from it, the grid displays only the filtered rows. When the value is cleared using the `CLEAR` button, the grid displays all rows.

<p align="center">
  <img class="img-responsive" src="../../../../../img/guides/custom-plugin-development/result.png">
</p>

The first step is to render custom markup.

## Render Custom Markup

To render custom markup in a UI element that belongs to the Grid ([toolbar](../reference/toolbar.md) in our case), we need to create a plugin. Wrap the custom markup in the [Plugin](../../../core/docs/reference/plugin.md) component to do this. We will name the plugin `ToolbarFilter`, since it will be part of the toolbar and will contain a filtering UI element.

Create a new folder called `plugins` in the project and add a new file, `toolbar-filter.js`, with the following code to it.

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

The Grid's toolbar exports a [template](../../../core/docs/reference/template.md) with the `toolbarContent` name. Add the [Template](../../../core/docs/reference/template.md) component to the plugin and set its `name` attribute to `toolbarContent`. This will be the place for our custom markup.

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

Because our plugin uses the toolbar's template, we should list the [Toolbar](../reference/toolbar.md) plugin in the dependencies.

```jsx
...

const pluginDependencies = [
  { name: 'Toolbar' }
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

Now, all is set to add custom markup to the `toolbarContent` template. To display a select box, add the [Select](https://material-ui.com/demos/selects/) component to the template.

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
After that, we can add our plugin to the Grid.

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
If you run the code now, the Grid should look as follows.
<p align="center">
  <img class="img-responsive" src="../../../../../img/guides/custom-plugin-development/add-select.png">
</p>

## Share Values Between Plugins

The select box is empty now. We should populate it with values of the column by which we want to filter the grid.

The `ToolbarFilter` plugin, which we implemented in the previous step, is a [UI plugin](./plugin-overview.md): it renders UI elements based on provided data. We could also enable it to modify the data or manipulate the Grid's state, but it is better to implement this functionality in a [state management plugin](./plugin-overview.md). This separation of concerns makes the plugins more flexible and maintainable.

The state management plugin called `ToolbarFilterState` will prepare all necessary information for the `ToolbarFilter` plugin. Create a new `toolbar-filter-state.js` file in the `plugins` folder and add the following code to it.

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

We should allow a user to specify the initial filter value. To do this, add the `defaultFilterValue` property to the plugin. The prefix is used by convention: all properties that specify default values in [uncontrolled mode](./controlled-and-uncontrolled-modes.md) should be prefixed with `default`. This tutorial does not cover the implementation of the controlled mode.

When a user selects a value in the select box, the `defaultFilterValue` will be changed. Save it in the component's state as shown below.

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
In this tutorial, we are going to filter the grid by the `CompanyName` column. Assign this name to the `columnName` attribute. In addition, set the `defaultFilterValue` to an empty string, so that the grid does not apply any filter initially.

Now, the `ToolbarFilterState` plugin is ready to be added to the Grid. A state management plugin, it should be included before UI plugins. You can find more information on plugin types in the [Plugin Overview](./plugin-overview.md).

*index.js:*
```jsx
...
import { ToolbarFilterState } from './plugins/toolbar-filter-state.js';

class App extends Component {
  ...
  render() {
    ...
    return (
      <Paper>
        <Grid
          ...
        >
          <ToolbarFilterState columnName="CompanyName" defaultFilterValue="" />
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
Although we added the `ToolbarFilterState` plugin, the select box still does nothing because the `ToolbarFilterState` does not communicate with the `ToolbarFilter`. Now, we need to collect unique values of the `CompanyName` column in the `ToolbarFilterState` and pass them to the `ToolbarFilter` so that it displayed them. For this, we will use [getters](../../../core/docs/reference/getter.md).

The [Grid](../reference/grid.md) plugin provides the `rows` property for specifying the row collection and exports the `rows` getter. We need to create a new getter that filters data from the `rows` getter. Such getters are called "computed getters" because they use other getters in calculations. The new getter in question is called `toolbarFilterDataItems` in the following code.

In addition, we want to display the name of the filtered column near the select box. The Grid exports the `columns` getter that we use in another computed getter named `toolbarFilterColumnTitle`.

Both computed getters also use the `columnName` property value in calculations.

*file toolbar-filter-state.js:*
```jsx
...
import {
    ..., Getter
} from '@devexpress/dx-react-core';

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    ...
    this.filterColumnTitleComputed = this.filterColumnTitleComputed.bind(this);
    this.filterDataItemsComputed = this.filterDataItemsComputed.bind(this);
  }
  filterColumnTitleComputed({columns}) {
    const column = columns.find(col => col.name === this.props.columnName);
    return column ? column.title : '';
  }
  filterDataItemsComputed({rows}) {
    return rows.reduce((acc, row) => {
      if(!acc.includes(row[this.props.columnName])) {
        acc.push(row[this.props.columnName]);
      }
      return acc;
    }, []);
  }
  render() {
    return (
      <Plugin
        name="ToolbarFilterState"
      >
        <Getter name="toolbarFilterColumnTitle" computed={this.filterColumnTitleComputed} />
        <Getter name="toolbarFilterDataItems" computed={this.filterDataItemsComputed} />
      </Plugin>
    );
  }
}
```

NOTE: If you use computed and value getters in one plugin, their order is important. Computed getters that depend on value getters should be included after the value getters.

To access `toolbarFilterDataItems` from the `ToolbarFilter` plugin, use the [TemplateConnector](../../../core/docs/reference/template-connector.md) as shown below:

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

Then, we should share the `defaultFilterValue` between the `ToolbarFilter` and `ToolbarFilterState` plugins. This involves an extra getter called `toolbarFilterValue`. In addition, the `ToolbarFilter` now depends on the `ToolbarFilterState`, and we should modify these plugins accordingly.

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
  { name: 'ToolbarFilterState' }
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

We need to detect changes in the select box value and filter the grid according to them. The `filterValue` property is stored in the state of the `ToolbarFilterState` plugin. However, the UI element that affects the `filterValue` is rendered by the `ToolbarFilter` plugin.

To detect modifications in one plugin and change the state of another accordingly, we should use an [action](../../../core/docs/reference/action.md). We will name it `changeToolbarFilterValue`.

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
The `changeToolbarFilterValue` action is available in any plugin used with the `ToolbarFilterState`. We can use the [TemplateConnector](../../../core/docs/reference/template-connector.md) to access the action from the `ToolbarFilter`. In the following code, this action is used in the `Select.onChange` event handler.

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
            ... // Accessing getters
           }, {
            changeToolbarFilterValue // Accessing actions
          }) => (
            <Select
              ...
              onChange={(event) => {changeToolbarFilterValue(event.target.value)}}
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

As you can see, the event handler accepts the `event` parameter that we can use to access the filter value. The filter value is passed to the `changeToolbarFilterValue` action (the previous code) and then to the state object of the `ToolbarFilterState` plugin (the code below).

*file toolbar-filter-state.js:*
```jsx
...
export class ToolbarFilterState extends React.PureComponent {
  ...
  changeValue(value) {
    this.setState({
      filterValue: value
    });
  }
  ...
}
```

Although we are detecting changes in the select box, the grid does not apply a filter yet. We need to add the [IntegratedFiltering](../reference/integrated-filtering.md) plugin to the Grid. According to the docs, the plugin imports a `filterExpression` getter that represents the filter expression to be applied. We should use a function to extend the `filterExpression` with the selected value.

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
          <ToolbarFilterState columnName="CompanyName" defaultFilterValue=""/>
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

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    ...
    this.filterExpressionComputed = this.filterExpressionComputed.bind(this);
  }
  ...
  filterExpressionComputed({filterExpression, toolbarFilterValue}) {
    const newFilterExpression = { ...filterExpression || {filters: [], operator: 'and'} };
    if(toolbarFilterValue) {
      newFilterExpression.filters = [...newFilterExpression.filters, {
        columnName: this.props.columnName,
        value: toolbarFilterValue
      }];
    }
    return newFilterExpression;
  }
  render() {
    ...
    return (
      <Plugin
        name="ToolbarFilterState"
      >
        ...
        <Getter name="filterExpression" computed={this.filterExpressionComputed} />
      </Plugin>
    );
  }
}
```

Now, you can filter grid rows by the `CompanyName` column.

## Final Steps

At the final steps, we should display the current column's caption near the select box and add the `Clear` button that clears the selected value. Since these steps do not add anything to the concepts explained earlier, we will go over them briefly:

* Add the `clearToolbarFilterValue` action to the `ToolbarFilterState` plugin. The action should clear the `filterValue` in the state.
* Add the `Button` widget next to the select box in the `ToolbarFilter` plugin and use `clearToolbarFilterValue` as the `onClick` event handler.
* We have already implemented the `toolbarFilterColumnTitle` getter in the `ToolbarFilterState` plugin. Add an `InputLabel` to the `ToolbarFilter` plugin and use the result of the getter to display the column name in the label.

The following code shows the last additions.

*file toolbar-filter-state.js:*
```jsx
...

export class ToolbarFilterState extends React.PureComponent {
  constructor(props) {
    super(props);
    ...
    this.clearValue = this.clearValue.bind(this);
  }
  ...
  clearValue() {
    this.setState({
      filterValue: ''
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
              toolbarFilterColumnTitle
            }, {
              ...,
              clearToolbarFilterValue
            }) => (
              <div>
                <InputLabel htmlFor="filter-field">{toolbarFilterColumnTitle}:</InputLabel>
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

[Here](https://codesandbox.io/s/0ymwn2lm8w) you can find the full project with custom plugins.
