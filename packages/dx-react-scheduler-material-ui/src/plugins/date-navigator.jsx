import * as React from 'react';
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


export class DateNavigator extends React.PureComponent {
  render() {
    return (
      <DateNavigatorBase
        rootComponent={Root}
        overlayComponent={Overlay}
        toggleButtonComponent={ToggleButton}
        navigationButtonComponent={NavigationButton}
        calendarComponent={Calendar}
        calendarNavigatorComponent={CalendarNavigator}
        calendarCellComponent={CalendarCell}
        calendarRowComponent={CalendarRow}
        calendarHeaderRowComponent={CalendarRow}
        calendarHeaderCellComponent={CalendarHeaderCell}
        calendarTitleComponent={CalendarTitle}
        calendarNavigationButtonComponent={NavigationButton}
        {...this.props}
      />
    );
  }
}

DateNavigator.Root = Root;
DateNavigator.ToggleButton = ToggleButton;
DateNavigator.Overlay = Overlay;
DateNavigator.NavigationButton = NavigationButton;

DateNavigator.Calendar = Calendar;
DateNavigator.CalendarNavigator = CalendarNavigator;
DateNavigator.CalendarCell = CalendarCell;
DateNavigator.CalendarRow = CalendarRow;
DateNavigator.CalendarHeaderCell = CalendarHeaderCell;
DateNavigator.CalendarHeaderRow = CalendarRow;
DateNavigator.CalendarTitle = CalendarTitle;
DateNavigator.CalendarNavigationButton = NavigationButton;
