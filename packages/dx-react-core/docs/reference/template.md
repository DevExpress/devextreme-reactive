# Template Component Reference

A React component that defines a markup that is rendered as the corresponding [TemplatePlaceholder](template-placeholder.md).

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | The template name. The `root` name is reserved. A template called `root` is rendered as the plugin based component's root.
predicate? | (params: object) => boolean | | A predicate function that returns a Boolean value that specifies whether the template should be rendered.
children | ReactNode &#124; ((params: object) => ReactNode) | | A markup or function that returns a markup based on the specified parameters.
