# TemplateConnector Component Reference

A React component that allows to connect values defined by [Getter](getter.md) and actions defined by [Action](action.md).

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
children | (getters: { [getterName: string]: any }, actions: { [actionName: string]: (payload?: any) => void }) => ReactNode | | A function used to connect getters and actions to a markup.
