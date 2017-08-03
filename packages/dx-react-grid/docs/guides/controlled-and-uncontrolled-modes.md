# React Grid - Controlled (stateless) and Uncontrolled (stateful) Modes

You may need to control the Grid state or delegate state management to a component, for instance, when switching the sorting state to the controlled mode to persist the Grid sorting an end-user configured and restoring it within the next app usage session. In this case, the Grid accepts the sorting configuration via the [SortingState](../reference/sorting-state.md) plugin properties and notifies you once an end-user has changed the sorting configuration, similar to the [controlled components concept](https://facebook.github.io/react/docs/forms.html#controlled-components).

In code, it looks as follows:

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

`Sorting` represents the Grid sorting configuration, and the `changeSorting` function is a handler that is invoked every time the sorting configuration changes. Note that all the state management plugins work with the serializable state. This means that you can persist and restore it in [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) or any other storage that can store string values. The controlled state mode can also be helpful if you need to indicate the current state in your UI or bind controls existing outside the Grid, for example, to put a ComboBox with the available sort orders and let end-users use it for sorting Grid data.

In the uncontrolled state mode, the Grid component manages its UI state internally. It is not necessary to specify the state value and state change handler properties. You can provide Grid with the initial state value using the property with the `default` prefix, for instance, converting the previous example into the uncontrolled mode:

```js
<Grid rows={[/* ... */]} columns={[/* ... */]}>
  <SortingState />
  { /* ... */ }
</Grid>
```

Specify the default sorting configuration as follows:

```js
<Grid rows={[/* ... */]} columns={[/* ... */]}>
  <SortingState defaultSorting={[ columnName: 'date', direction: 'desc' ]} />
  { /* ... */ }
</Grid>
```

You can configure the Grid when you need to control its state partially, for example, to manage filters without managing sorting and grouping:

```js
<Grid rows={[/* ... */]} columns={[/* ... */]}>
  <FilteringState filters={filters} onFiltersChange={this.changeFilters}/>
  <SortingState />
  <GroupingState />
  { /* ... */ }
</Grid>
```

Note: We recommend using the fully-controlled state to avoid the side-effects the partially controlled state can cause when using Redux and performing time traveling.
