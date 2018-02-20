# TemplateConnector Component Reference

A React component that provides access to [Getters](getter.md) and [Actions](action.md) within a [Template](template.md).

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
children | (getters: { [getterName: string]: any }, actions: { [actionName: string]: (payload?: any) => void }) => ReactNode | | A function that renders a markup using Getters and Actions passed as arguments.
