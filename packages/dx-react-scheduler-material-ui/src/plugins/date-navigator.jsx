import * as React from 'react';
import { DateNavigator as DateNavigatorBase } from '@devexpress/dx-react-scheduler';
import { Overlay } from '../templates/date-navigator/overlay';
import { Table } from '../templates/date-navigator/table';
import { ToggleButton } from '../templates/date-navigator/toggle-button';
import { Cell } from '../templates/date-navigator/cell';
import { HeaderCell } from '../templates/date-navigator/header-cell';
import { Row } from '../templates/date-navigator/row';
import { Navigator } from '../templates/date-navigator/navigator';
import { Title } from '../templates/date-navigator/title';
import { NavigationButton } from '../templates/date-navigator/navigation-button';

export class DateNavigator extends React.PureComponent {
  render() {
    return (
      <DateNavigatorBase
        overlayComponent={Overlay}
        tableComponent={Table}
        toggleButtonComponent={ToggleButton}
        cellComponent={Cell}
        rowComponent={Row}
        headerRowComponent={Row}
        headerCellComponent={HeaderCell}
        navigatorComponent={Navigator}
        titleComponent={Title}
        navigationButtonComponent={NavigationButton}
        {...this.props}
      />
    );
  }
}

DateNavigator.Table = Table;
DateNavigator.ToggleButton = ToggleButton;
DateNavigator.Cell = Cell;
DateNavigator.Row = Row;
DateNavigator.HeaderCell = HeaderCell;
DateNavigator.HeaderRow = Row;
DateNavigator.Overlay = Overlay;
DateNavigator.Navigator = Navigator;
DateNavigator.Title = Title;
DateNavigator.NavigationButton = NavigationButton;
