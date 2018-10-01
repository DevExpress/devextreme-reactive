import { withComponents } from '@devexpress/dx-react-core';
import { DateNavigator as DateNavigatorBase } from '@devexpress/dx-react-scheduler';
import { Root } from '../templates/date-navigator/root';
import { Overlay } from '../templates/date-navigator/overlay';
import { ToggleButton } from '../templates/date-navigator/toggle-button';
import { NavigationButton } from '../templates/date-navigator/navigation-button';
import { Root as Calendar } from '../templates/date-navigator/calendar/root';
import { Cell as CalendarCell } from '../templates/date-navigator/calendar/cell';
import { HeaderCell as CalendarHeaderCell } from '../templates/date-navigator/calendar/header-cell';
import { Row as CalendarRow } from '../templates/date-navigator/calendar/row';
import { Navigator as CalendarNavigator } from '../templates/date-navigator/calendar/navigator';
import { Title as CalendarTitle } from '../templates/date-navigator/calendar/title';

export const DateNavigator = withComponents({
  Root,
  ToggleButton,
  Overlay,
  NavigationButton,
  Calendar,
  CalendarNavigator,
  CalendarCell,
  CalendarRow,
  CalendarHeaderCell,
  CalendarHeaderRow: CalendarRow,
  CalendarTitle,
  CalendarNavigationButton: NavigationButton,
})(DateNavigatorBase);
