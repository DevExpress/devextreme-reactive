# React Scheduler - Localization

The React Scheduler provides a simple localization API. All the scheduler texts are separated to two parts:
- format dates;
- localization messages.

**Format Dates**

The UI plugins of the Scheduler control often render formated date texts dependent on locale. To specify special locale set the `locale` property of the [Scheduler](../reference/scheduler.md) component with following [format](https://tools.ietf.org/html/rfc5646).

**Localization Messages**

Almost each UI plugin accepts the `messages` option bag that specifies localized messages. These messages specifies special support texts.

## Basic Setup

The following example demonstrates how to change the scheduler localization by specify `messages` and `locale` properties.

.embedded-demo({ "path": "scheduler-localization/locale", "showThemeSelector": true })

## Customize Date Formating

To change built-in date formating texts you should override our components and pass into them custom date formating function into a `formatDate` property. In the following example we use full week day names in the day scale and use times with seconds in the time scale. In the sample we create a custom formating functions and use a `moment.js` library.

.embedded-demo({ "path": "scheduler-localization/custom-formating", "showThemeSelector": true })

NOTE: How to override built-in UI components see the [Fundamentals guide](./fundamentals.md#customize-the-appearance).
