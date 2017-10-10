# Localization

The React Grid provide convenient API that can be used for localization purposes. If a plugin contains text information that can be localized, it has a `messages` option bag. For example, the TableView supports such option like `messages.noDataText`. The usage is quite easy:

{% raw %}
```js
<TableView
  messages={{ noDataText: 'Keine Daten verfügba' }}
/>
```
{% endraw %}

Here we are using german localization message instead of english.

The following demo shows more complex scenario:

.embedded-demo(localization/basic)
