# Title Plugin Reference

The Title plugin allows to show title on chart.

## Importing

Use the following import statement:

```js
import { Title } from '@devexpress/dx-react-chart-material-ui';
// import { Title } from '@devexpress/dx-react-chart-bootstrap4';
```
## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
textComponent | ComponentType&lt;[Title.TextProps](#titletextprops)&gt; | | A component that renders the title.
text | string | | Text of the title.
position | 'top' &#124; 'bottom' &#124; 'left' &#124; 'right' | 'top' | Position of the title.

## Interfaces

### Title.TextProps

Describes properties passed to a component that renders the title.

Field | Type | Description
------|------|------------
text | string | Text of the title.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Title.Text | [Title.TextProps](#titletextprops) | A component that renders the title.
