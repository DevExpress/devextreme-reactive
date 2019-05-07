# React Scheduler - Localization

The React Scheduler provides an API that allows you to format dates and localize messages.

**Format Dates**

Scheduler UI plugins can display dates that are formatted depending on the locale. To specify the locale, assign one of the [supported formats](https://tools.ietf.org/html/rfc5646) to the [Scheduler](../reference/scheduler.md) component's `locale` property.

**Localize Messages**

Most UI plugins have the `messages` option that accepts localized messages.

## Basic Setup

The following example demonstrates how to localize the Scheduler by specifying the `messages` and `locale` properties.

.embedded-demo({ "path": "scheduler-localization/locale", "showThemeSelector": true })

## Customize Date Formatting

To customize how dates are formatted in a component, [override the component](./fundamentals.md#customize-the-appearance) and set the `formatDate` property to a function that formats dates. The following example illustrates these actions. Note that in this example, the [Moment.js](https://momentjs.com/) library is used to work with dates.

.embedded-demo({ "path": "scheduler-localization/custom-formatting", "showThemeSelector": true })

