# Localization

The React Grid provides a simple localization API. Each plugin accepts the `messages` option bag specifying localized messages. In the following example, German localization is applied to the `TableView` plugin's "no data" text using the `messages` bag's `noData` field.

{% raw %}
```js
<TableView
  messages={{ noData: 'Keine Daten verfügbar' }}
/>
```
{% endraw %}

The following demo demonstrates more complex scenario:

.embedded-demo(localization/basic)
