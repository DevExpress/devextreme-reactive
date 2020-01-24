import { GroupOrientation } from "./types";

export const VERTICAL_TYPE = 'vertical';
export const HORIZONTAL_TYPE = 'horizontal';

export const SCROLL_OFFSET = 50;
export const SCROLL_SPEED_PX = 30;

export const SECONDS = 'seconds';
export const MINUTES = 'minutes';
export const HOURS = 'hours';

export const RESIZE_TOP = 'resize-start';
export const RESIZE_BOTTOM = 'resize-end';

export const POSITION_START = 'start';
export const POSITION_END = 'end';

export const AUTO_HEIGHT = 'auto';

export const DAY_OPTIONS = { day: 'numeric' };
export const WEEK_DAY_OPTIONS = { weekday: 'short' };
export const SHORT_MONTH_OPTIONS = { month: 'short' };
export const HOUR_MINUTE_OPTIONS = { hour: 'numeric', minute: 'numeric' };
export const MONTH_YEAR_OPTIONS = { month: 'long', year: 'numeric' };
export const DAY_SHORT_MONTH_OPTIONS = { day: 'numeric', month: 'short' };
export const SHORT_MONTH_LONG_YEAR_OPTIONS = { month: 'short', year: 'numeric' };
export const SHORT_MONTH_SHORT_YEAR_OPTIONS = { month: 'short', year: '2-digit' };
export const DAY_LONG_MONTH_LONG_YEAR_OPTIONS = { day: 'numeric', month: 'long', year: 'numeric' };
export const DAY_SHORT_MONTH_LONG_YEAR_OPTIONS = {
  day: 'numeric', month: 'short', year: 'numeric',
};
export const DAY_SHORT_MONTH_SHORT_YEAR_OPTIONS = {
  day: 'numeric', month: 'short', year: '2-digit',
};
export const LONG_WEEK_DAY_OPTIONS = { weekday: 'long' };
export const LONG_MONTH_OPTIONS = { month: 'long' };
export const DAY_LONG_MONTH_OPTIONS = { day: 'numeric', month: 'long' };
export const EMPTY_OPTIONS = {};

export const RECURRENCE_EDIT_SCOPE = {
  ALL: 'all',
  CURRENT_AND_FOLLOWING: 'currentAndFollowing',
  CURRENT: 'current',
};

export const TOGGLE_APPOINTMENT_FORM_VISIBILITY = 'toggleAppointmentFormVisibility';
export const TOGGLE_APPOINTMENT_TOOLTIP_VISIBILITY = 'toggleAppointmentTooltipVisibility';

export const WEEKDAY_INTERVAL = 'weekdayInterval';

export const VERTICAL_VIEW_LEFT_OFFSET = 80;
export const HORIZONTAL_VIEW_LEFT_OFFSET = 0;

export const VERTICAL_GROUP_ORIENTATION = 'Vertical' as GroupOrientation;
export const HORIZONTAL_GROUP_ORIENTATION = 'Horizontal' as GroupOrientation;
