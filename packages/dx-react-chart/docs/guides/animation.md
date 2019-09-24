# React Chart - Animation

You can add the [Animation](../reference/animation.md) plugin to the Chart component to animate all the series.

## Basic Setup

Import the `Animation` plugin.

## Animation setups

You can modify animation easing and duration. For that use `duration` and `easing` properties in the `Animation` plugin. The following example demonstrates how to change easing using the d3 library and how to change duration:

.embedded-demo({ "path": "animation/custom-easing", "showThemeSelector": true })

## Transition animation

In the following example shows animation when data updated:

.embedded-demo({ "path": "animation/with-transition", "showThemeSelector": true })
