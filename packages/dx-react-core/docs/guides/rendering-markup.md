# React Core - Render Markup

A plugin-based component's main purpose is to render markups defined in separate plugins as a single React component tree.

## Template and TemplatePlaceholder

A markup is defined in the [Template](../reference/template.md) plugin primitives. The [TemplatePlaceholder](../reference/template-placeholder.md) visualization primitive specifies where to render the associated template. Its `name` property should hold the associated template's name.

.embedded-demo({ "path": "core-template/template-placeholder", "defaultTab": "source" })

## Root Template

The `root` template name is reserved. If you create a template with the `root` name, it is rendered in the plugin-based component's root.

.embedded-demo({ "path": "core-basic/plugin-component", "defaultTab": "source" })

## Pass Parameters to a Template

You can render similar entities using a single template. For this, associate several template placeholders with the template and pass parameters to this template using the TemplatePlaceholder's `params` property.

.embedded-demo({ "path": "core-template/template-parameters", "defaultTab": "source" })

## Override a Template

You can override an existing template by creating a new one with the same name. You can render an overridden template within a new one using the `TamplatePlaceholder` component without a name.

.embedded-demo({ "path": "core-template/template-overriding", "defaultTab": "source" })
