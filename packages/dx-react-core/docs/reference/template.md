# Template Component Reference

A React component that defines markup that will be rendered by a corresponding [TemplatePlaceholder](template-placeholder.md).

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A name used to identify a template. The `root` template name is a reserved name used as a root markup to be rendered within plugged component.
predicate | (params: object) => boolean | | A predicate function specifies whether a template should be rendered or not.
children | (params: object) => ReactElement &#124; ReactElement | | A function used to render markup based on specified parameters or a markup without bindings.
