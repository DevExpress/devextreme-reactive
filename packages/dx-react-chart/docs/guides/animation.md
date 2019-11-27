# React Chart - Animation

To animate chart series, add the [Animation](../reference/animation.md) plugin to the Chart component.

## Basic Setup

Import the [Animation](../reference/animation.md) plugin.

.embedded-demo({ "path": "animation/simple-animation", "showThemeSelector": true })


## Animation on Transitions

The following example shows how series are animated on data update:

.embedded-demo({ "path": "animation/with-transition", "showThemeSelector": true })

## Customize Animation

Use the `Animation` plugin's `duration` and `easing` properties to specify the animation's duration and easing type.

In the following code, the easing implementation is taken from the `d3` library:

.embedded-demo({ "path": "animation/custom-easing", "showThemeSelector": true })
