# Getter Component Reference

A React component that shares a value among other plugins within a plugin based compoent.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | The getter name.
value? | any | | A value value to share.
computed? | (getters: { [getterName: string]: any }) => any | | A function that calculates a value depending on the values exposed by other getters. The value is computed each time a related getter's value changes. Applies only if `value` is not defined.
