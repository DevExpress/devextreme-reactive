# React Core - Provide Values

A [Getter](../reference/getter.md) is a plugin primitive used to share a value between other plugins. The shared value is a single field of the plugin-based component's state.

Commonly, a getter is used to access a value associated with it in the markup of another plugin. For this, use the [TemplateConnector](../reference/template-connector.md) primitive.

.embedded-demo({ "path": "core-getter/value-getter", "defaultTab": "source" })

A getter can hold an array or function as well as values like strings, numbers etc.

## Extend an Existing Getter

A value defined by a Getter is a part of a plugin's public API which means other plugins can access and change this value.

.embedded-demo({ "path": "core-getter/computed-getter", "defaultTab": "source" })

In the example above, a getter with the same name can override the current getter's value. You can also compute a getter's value regarding other getters and local variables.
