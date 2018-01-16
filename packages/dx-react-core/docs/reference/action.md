# Action Component Reference

A React component that exposes a function that can be executed outside of the plugin containing it.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A name used to identify an action.
action | (payload?: any) => void | | A function that will be called on an action execution.
