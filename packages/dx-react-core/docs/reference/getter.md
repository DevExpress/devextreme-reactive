# Getter Component Reference

A React component that exposes a value that can be used or modified outside of the plugin containing it.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
name | string | | A name used to identify a value.
value? | any | | A value.
computed? | (getters: { [getterName: string]: any }) => any | | A function used to calculate a value depending on values exposed by other getters. A value will be recomputed each time a dependency changes. Used when the `value` property is not defined.
