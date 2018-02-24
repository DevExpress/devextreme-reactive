# React Core - Providing Actions

[Action](../reference/action.md) is a plugin primitive that shares a function defined in a plugin among all plugins of a plugin based component.

Commonly, action is used to execute a function associated with it from a UI event handler defined in the markup of another plugin. For this, use the [TemplateConnector](../reference/template-connector.md) primitive.

.embedded-demo({ "path": "core-action/simple-action", "defaultTab": "source" })

## Passing Action parameters

Action accepts a payload that is passed to the underlying function.

.embedded-demo({ "path": "core-action/parameterized-action", "defaultTab": "source" })
