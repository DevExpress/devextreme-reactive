# React Core - Providing Values

One of the key part of pluggable React component is a possibility to share data between plugins.

## Getter

[Getter](../reference/getter.md) is a plugin primitive that defines a value that can be used or modified outside of the plugin containing it. It is an invisible component. It uses the `name` property to identify the value.

In other words, Getter defines one field of pluggable React component state. Typically, Getter holds [normalized data](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html).

// demo with value getter

Getter's value is not restricted to any type, so it may hold an array or a function to share with another plugins.

## Extending Existing Getter

A value defined by Getter is a part of plugin's public API. So, this value can be used and even changed by other plugins.

// demo with computed getter

As you may see, Getter's value can be extended not only by previously defined Getter but and with other Getters or local variables.

## Getters in Markup

The main application of Getter is a possibility to connect a result value to markup. [TemplateConnector](../reference/template-connector.md) is a visialisation primitive that serves this need.

// demo with connected getter
