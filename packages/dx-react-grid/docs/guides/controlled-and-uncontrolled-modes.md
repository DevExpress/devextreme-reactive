# React Grid - Controlled (stateless) and Uncontrolled (stateful) Modes

Use appropriate state management plugins (plugins that end with "...State", for example, `SortingState`) to control the required Grid's functionality. For example, the [SortingState](../reference/sorting-state.md) plugin controls the sorting capabilities; the [FilteringState](../reference/filtering-state.md) plugin controls filtering features, etc. See [Reference](../reference/README.md) for the complete plugin list.

## Controlled Mode

In the controlled mode, the Grid's state is managed externally (for example, in the parent component, Redux store, etc.). Refer to the [React documentation](https://facebook.github.io/react/docs/forms.html#controlled-components) for more information about the controlled components concept.

The controlled mode enables you to access the Grid's state from another application parts. For example, you can persist the state and restore it when required, or change it via an external UI.

Use the appropriate state management plugin properties to set the Grid's configuration and handle configuration changes a user makes via the Grid's UI. In the example below, sorting configuration is passed to the the `SortingState` plugin's `sorting` property, and the function passed to the `onSortingChanged` property handles the sorting configuration changes.

```js
export class MyApp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [/* ... */],
      rows: [/* ... */],
      sorting: [{ columnName: 'date', direction: 'desc' }],
    };

    this.changeSorting = sorting => this.setState({ sorting });
  }
  render() {
    const { rows, columns, sorting } = this.state;

    return (
      <Grid rows={rows} columns={columns}>
        <SortingState sorting={sorting} onSortingChange={this.changeSorting} />
        { /* ... */ }
      </Grid>
    );
  }
}
```

If you need to apply a new configuration to the Grid, update the parent component state using the `setState` method.

Note that all the state management plugins use a serializable state. This means that you can persist it in a [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) or any other storage that can store string values.

## Uncontrolled Mode

In the uncontrolled state mode, the Grid component manages its state internally. In this case, you should only add the required state management plugins and optionally define the initial configuration using properties with the `default` prefix (for example, the `SortingState` plugin's `defaultSorting` property).

```js
<Grid rows={[/* ... */]} columns={[/* ... */]}>
  <SortingState defaultSorting={[ columnName: 'date', direction: 'desc' ]} />
  <GroupingState />
  { /* ... */ }
</Grid>
```

## Partially Controlled mode

You can control only certain parts of the Grid's configuration. In this case, apply the [controlled mode](#controlled-mode) only to plugins whose state you want to control externally and the [uncontrolled mode](#uncontrolled-mode) to another plugins.

```js
<Grid rows={[/* ... */]} columns={[/* ... */]}>
  <!--Filtering is controlled by the parent component-->
  <FilteringState filters={filters} onFiltersChange={this.changeFilters}/>

  <!--The following plugins are controlled internally-->
  <SortingState defaultSorting={[ columnName: 'date', direction: 'desc' ]} />
  <GroupingState />
  { /* ... */ }
</Grid>
```

Note: We recommend avoiding the partially controlled mode due to the side-effects it can cause when using Redux and performing time traveling.
