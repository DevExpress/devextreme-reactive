# React Core - Providing Actions

An [Action](../reference/action.md) is a primitive plugin that shares a function defined in a plugin among all plugins of a plugin based component.

Usually, an action is used to execute a function associated with it from a UI event handler defined in another plugin's markup via the [TemplateConnector](../reference/template-connector.md) primitive.

.embedded-demo({ "path": "core-action/simple-action", "defaultTab": "source" })

## Passing Action parameters

An Action accepts a payload that is passed to the underlying function.

.embedded-demo({ "path": "core-action/parameterized-action", "defaultTab": "source" })
