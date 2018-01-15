# Template Component Reference

React component that specifies plugin's markup.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A template's name. If 'name' is specified as "root", all UI elements of a corresponding PluginHost component will be rendered inside this template.
predicate | () => boolean | | A function specifies whether a template will be applied or not.
children | Array&lt;ReactElement&gt; | | React elements that represent template's UI elements.
