# Getter Component Reference

A React component that shares a value between other plugins within a plugin-based component.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | The Getter's name.
value? | any | | The shared value.
computed? | (getters: { [getterName: string]: any }) => any | | A function that calculates a value depending on the values other Getters expose. The value is computed each time a related Getter's value changes. Applies only if `value` is not defined.
