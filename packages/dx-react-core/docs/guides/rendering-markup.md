# React Core - Rendering Markup

The main purpose of a plugin based component is to render markup defined in separate plugins into a single React component tree.

## Template and TemplatePlaceholder

Markup is defined in the [Template](../reference/template.md) plugin primitives identified by the name. The [TemplatePlaceholder](../reference/template-placeholder.md) vizualization primitive specifies where to render the required template. Its `name` property should hold the associated template name.

.embedded-demo({ "path": "core-template/template-placeholder", "defaultTab": "source" })

## Root Template

The `root` template name is reserved. If you create a template with the `root` name, it is rendered to the plugin based componet's root.

.embedded-demo({ "path": "core-basic/plugin-component", "defaultTab": "source" })

## Passing Parameters to a Template

You can render similar entities using a single template by passing parameters to the template when rendering. For this, use the TemplateHolder's `params` property.

.embedded-demo({ "path": "core-template/template-parameters", "defaultTab": "source" })

## Template Overriding

You can override an existing template by creating a new one with the same name. If you define several templates with the same name, the last defined one is used. You can render an overridden template within a new one using the `<TamplatePlaceholder/>` component without parameters.

.embedded-demo({ "path": "core-template/template-overriding", "defaultTab": "source" })
