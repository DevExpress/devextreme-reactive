# React Scheduler - Localization

The React Scheduler provides a simple localization API. All the scheduler texts are separated to two parts:
- format dates;
- localization messages.

**Format Dates**

The UI plugins of the Scheduler control often render formated date texts dependent on locale. To specify special locale set the `locale` property of the [Scheduler](../reference/scheduler.md) component with following [format](https://tools.ietf.org/html/rfc5646).

**Localization Messages**

Almost each UI plugin accepts the `messages` option bag that specifies localized messages. These messages specifies special support texts.

The following example demonstrates how to change the scheduler localization by specify `messages` and `locale` properties.

.embedded-demo({ "path": "scheduler-localization/locale", "showThemeSelector": true })
