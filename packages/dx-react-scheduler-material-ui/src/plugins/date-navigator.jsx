import * as React from 'react';
import { DateNavigator as DateNavigatorBase } from '@devexpress/dx-react-scheduler';
import { Overlay } from '../templates/date-navigator/overlay';
import { Table } from '../templates/date-navigator/table';
import { ToggleButton } from '../templates/date-navigator/toggle-button';
import { Cell } from '../templates/date-navigator/cell';
import { Row } from '../templates/date-navigator/row';

export class DateNavigator extends React.PureComponent {
  render() {
    return (
      <DateNavigatorBase
        overlayComponent={Overlay}
        tableComponent={Table}
        toggleButtonComponent={ToggleButton}
        cellComponent={Cell}
        rowComponent={Row}
        {...this.props}
      />
    );
  }
}

DateNavigator.Table = Table;
DateNavigator.ToggleButton = ToggleButton;
DateNavigator.Cell = Cell;
DateNavigator.Row = Row;
DateNavigator.Overlay = Overlay;
