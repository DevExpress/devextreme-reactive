# Title Plugin Reference

The Title plugin renders the chart title.

## Importing

Use the following import statement:

```js
import { Title } from '@devexpress/dx-react-chart-material-ui';
// import { Title } from '@devexpress/dx-react-chart-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Title } from '@devexpress/dx-react-chart';
```

## User Reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
textComponent | ComponentType&lt;[Title.TextProps](#titletextprops)&gt; | | A component that renders the title.
text | string | | The title text.
position? | 'top' &#124; 'bottom' &#124; 'left' &#124; 'right' | 'top' | The title position.

## Interfaces

### Title.TextProps

Describes properties passed to a component that renders the title.

Field | Type | Description
------|------|------------
text | string | The title text.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Title.Text | [Title.TextProps](#titletextprops) | A component that renders the title.
