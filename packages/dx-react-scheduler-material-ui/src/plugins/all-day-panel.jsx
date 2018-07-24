import * as React from 'react';
import { AllDayPanel as AllDayPanelBase } from '@devexpress/dx-react-scheduler';
import { Layout } from '../templates/all-day-panel/layout';
import { Cell } from '../templates/all-day-panel/cell';
import { Row } from '../templates/all-day-panel/row';

export class AllDayPanel extends React.PureComponent {
  render() {
    debugger
    return (
      <AllDayPanelBase
        layoutComponent={Layout}
        cellComponent={Cell}
        rowComponent={Row}
        {...this.props}
      />
    );
  }
}
