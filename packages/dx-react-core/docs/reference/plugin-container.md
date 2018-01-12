# PluginContainer Component Reference

React component that contains plugin's primitives such as [Action](action.md), Getter, Template.

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
children | Array&lt;ReactElement&gt; | | React elements used to implement plugin's logic and render plugin's UI.
pluginName | string | | A plugin name.
dependencies | Array&lt;[PluginDependency](#plugindependency)&gt; | | Plugin's dependencies.

## Interfaces

### PluginDependency

An object representing a plugin dependency.

A value with the following shape:

Field | Type | Description
------|------|------------
pluginName | string | A dependency name.
optional | boolean | Specifies whether the dependency isn't required.
