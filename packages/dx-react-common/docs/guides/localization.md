# React Components - Localization

This article describes how to localize UI texts in DevExtreme React Components.

## The "Messages" Property

Plugins that render UI texts have the `messages` property. It accepts an object that contains messages as key-value pairs in which keys are message IDs and values are the messages. For a list of message IDs that a plugin supports, see the Localization Messages section of the plugin's API Reference.

To translate a message, find the plugin the renders it and specify the plugin's `messages` property with an object that contains your translations. Those message IDs that you omit from the object use default translations.

The following code translates a message from the `Table` plugin.

```jsx
const tableMessages = {
  noData: 'Keine Daten verfügbar',
};
...
<Table messages={tableMessages}>
```

## Custom Message IDs

In some cases, components allow you to use custom message IDs. For example, in the React Grid component, custom filter operation names are used as message IDs to retrieve texts for filter selector items:

```jsx
<DataTypeProvider
  for={dateColumns}
  availableFilterOperations={['month', ...]}
/>
<TableFilterRow
  messages={{ month: 'Month equals' }}
/>
```
The complete code is available in the [Custom Filter Operations](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/filtering/#custom-filter-operations) article.

## Placeholders

Messages can contain texts in curly braces. These are placeholders used to display dynamic values. For example, the `PagingPanel` plugin's `info` message contains three placeholders:

```jsx
const pagingMessages = {
  info: '${from}-${to} of ${count}',
};
``
They will be replaced with real data when the plugin is rendered.


See also:  
[Grid Localization]()  
[Scheduler Localization]()
