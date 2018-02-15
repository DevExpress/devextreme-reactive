# React Core - Providing Values

[Getter](../reference/getter.md) is a plugin primitive that shares a value defined in a plugin among all plugins of a plugin based component. In other words, Getter defines a single field of the plugin based component's state.

Commonly, a getter is used to access a value associated with it in the markup of another plugin. For this, use the [TemplateConnector](../reference/template-connector.md) primitive.

.embedded-demo({ "path": "core-getter/value-getter", "defaultTab": "source" })

Getter's value is not restricted to a type. That is, it can hold an array or a function as well as more simple types.

## Extending Existing Getter

A value defined by Getter is a part of plugin's public API. So, this value can be used and even changed by other plugins.

.embedded-demo({ "path": "core-getter/computed-getter", "defaultTab": "source" })

As you can see, the Getter's value can be overridden by another Getter with the same name. You can also compute a getter value in terms of another getters and local variables.
