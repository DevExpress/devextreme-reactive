# React Chart - Animation

To animate chart series, add the [Animation](../reference/animation.md) plugin to the Chart component.

## Basic Setup

Import the [Animation](../reference/animation.md) plugin.

.embedded-demo({ "path": "animation/simple-animation", "showThemeSelector": true })


## Transition Animation

In the following example shows animation when data updated:

.embedded-demo({ "path": "animation/with-transition", "showThemeSelector": true })

## Customize Animation

You can modify animation easing and duration. For that use `duration` and `easing` properties in the `Animation` plugin. The following example demonstrates how to change easing using the d3 library and how to change duration:

.embedded-demo({ "path": "animation/custom-easing", "showThemeSelector": true })
