# React Core - Providing Actions

Pluggable React component allows to share actions between plugins.

## Action

[Action](../reference/action.md) is a plugin primitive that defines a function that can be executed outside of the plugin containing it. It is an invisible component. It uses the `name` property to identify the function.

The main application of Action is a possibility to connect a result value to markup. [TemplateConnector](../reference/template-connector.md) is a visialisation primitive that serves this need.

.embedded-demo({ "path": "core-action/simple-action" })

## Passing Action parameters

Action can consume payload that will be passed to the underlying function.

.embedded-demo({ "path": "core-action/parameterized-action" })
