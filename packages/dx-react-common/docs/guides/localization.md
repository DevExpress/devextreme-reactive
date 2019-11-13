# React Components - Localization

React Components provide an easy way to localize UI texts such as button captions, menu items and error messages. This article describes a recommended approach to localization.

## 'Messages' property

The mechanism is straightforward: plugins that render such texts accept the `messages` property. A `messages` is a plain object with following shape: `{ messageId: text }`. A `messageId` is a string identifictor specified in a plugin's API Reference page in a "Localization Messages" section. To translate a particular message you should find a plugin that renders the message and provide the plugin with `messages` object containing you translation. The `messages` object then merges with default translation so it's possible to omit some `messageId`s.  
Below is a sample code to translate the Table plugin.

```jsx
const tableMessages = {
  noData: 'Keine Daten verfügbar',
};
...
<Table messages={tableMessages}>
```

## Custom messages

In some cases you can display text using your own `messageId`. For example, in the React Grid component a custom filter operation name is used as a messageId to retrieve a text for a filter selector drop-down.

```jsx
<DataTypeProvider
  for={dateColumns}
  availableFilterOperations={['month', ...]}
/>
<TableFilterRow
  messages={{ month: 'Month equals' }}
/>
```
Complete code for this example is available at the following [link](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/filtering/#custom-filter-operations).

## Dynamic Data

Some string contain text in a curly brackets. They are placeholders that are used to display some dynamic value. For example, the following string 'info' from the PagingPanel plugin "`${from}-${to} of ${count}`" contains 3 placeholders that will be replaced with actual data on rendering.


See also:  
[Grid localization]()  
[Scheduler localization]()
