# React Core - Template and TemplatePlaceholder

Template and TemplatePlaceholder are components that defines and renders markup.

## Template

[Template](../reference/template.md) is a plugin primitive that defines markup. It is an invisible component. It uses the `name` property to identify markup.

## Root Template

In any pluggable component there is reserved `root` Template name. It is a starting point that renders content.

.embedded-demo({ "path": "core-template/root-template" })

## TemplatePlaceholder

[TemplatePlaceholder](../reference/template-placeholder.md) is a visialisation primitive that renders markup. It uses the `name` property to identify markup to be rendered.

.embedded-demo({ "path": "core-template/template-placeholder" })

## Passing Parameters to Template

Template can be rendered with additional parameters. It helps to use the same Template to render a group of similar entities. To render parametrized Template it is needed to pass parameters to TemplatePlaceholder by the `params` property.

.embedded-demo({ "path": "core-template/template-parameters" })

## Template Overriding

One of the key feature of the Template is a possibility to override existing template with the same `name` property value. It is also possible to use a previously defined markup.

.embedded-demo({ "path": "core-template/template-overriding" })
