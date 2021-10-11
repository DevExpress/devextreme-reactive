import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
  green, lightGreen, lime, yellow, amber, orange, deepOrange,
} from '@mui/material/colors';
import { VIEW_TYPES } from '@devexpress/dx-scheduler-core';

export const PRIMARY_COLOR = blue;
export const TRANSITIONS_TIME = 400;
export const DEFAULT_PALETTE = [
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
  green, lightGreen, lime, yellow, amber, orange, deepOrange,
];

export const XS_CELL_WIDTH = 50;
export const SMALL_CELL_WIDTH = 65;
export const CELL_WIDTH = 100;

export const XS_LAYOUT_WIDTH = 500;
export const SMALL_LAYOUT_WIDTH = 700;

export const SMALL_LAYOUT_MEDIA_QUERY = `@media (max-width: ${XS_LAYOUT_WIDTH}px)`;
export const LAYOUT_MEDIA_QUERY = `@media (max-width: ${SMALL_LAYOUT_WIDTH}px)`;

export const GROUPING_PANEL_VERTICAL_CELL_WIDTH = 12.5;

export const DEFAULT_SPACING = 8;
export const SPACING_CELL_HEIGHT = {
  [VIEW_TYPES.MONTH]: 12.5,
  [VIEW_TYPES.WEEK]: 6,
  [VIEW_TYPES.DAY]: 6,
  [VIEW_TYPES.ALL_DAY_PANEL]: 5.75,
};
export const BASIC_CELL_HEIGHT = {
  [VIEW_TYPES.MONTH]: SPACING_CELL_HEIGHT[VIEW_TYPES.MONTH] * DEFAULT_SPACING,
  [VIEW_TYPES.WEEK]: SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK] * DEFAULT_SPACING,
  [VIEW_TYPES.DAY]: SPACING_CELL_HEIGHT[VIEW_TYPES.DAY] * DEFAULT_SPACING,
  [VIEW_TYPES.ALL_DAY_PANEL]: SPACING_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL] * DEFAULT_SPACING,
};
export const SPACING_LABEL_HEIGHT = SPACING_CELL_HEIGHT[VIEW_TYPES.WEEK];
export const LEFT_PANEL_WIDTH_SPACING = 10;
