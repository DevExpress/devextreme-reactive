# Action Component Reference

A React component that shares a function between other plugins within a plugin-based component.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | The action name.
action | (payload?: any) => void | | A function that is called when the action is executed.
