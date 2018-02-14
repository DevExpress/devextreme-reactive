# React Core - Actions

[Action](../reference/action.md) is a plugin primitive that shares a function defined in a plugin among all plugins of a plugin based component.

Commonly, action execution should cause changes in a plugin markup. For this, use another visualization primitive - [TemplateConnector](../reference/template-connector.md), which updates the markup according to the action result.

.embedded-demo({ "path": "core-action/simple-action", "defaultTab": "source" })

## Passing Action parameters

Action can consume a payload that will be passed to the underlying function.

.embedded-demo({ "path": "core-action/parameterized-action", "defaultTab": "source" })
