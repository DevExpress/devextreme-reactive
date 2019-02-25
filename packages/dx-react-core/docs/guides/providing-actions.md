# React Core - Provide Actions

An [Action](../reference/action.md) is a plugin primitive used to share a function between other plugins.

Usually, an action is used to execute a function associated with it from a UI event handler defined in another plugin's markup via the [TemplateConnector](../reference/template-connector.md) primitive.

.embedded-demo({ "path": "core-action/simple-action", "defaultTab": "source" })

## Pass Action Parameters

An Action accepts a payload that is passed to the underlying function.

.embedded-demo({ "path": "core-action/parameterized-action", "defaultTab": "source" })
