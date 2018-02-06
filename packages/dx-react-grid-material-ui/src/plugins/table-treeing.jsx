import React from 'react';
import { TableTreeing as TableTreeingBase } from '@devexpress/dx-react-grid';
import { Toggle } from '../templates/table-treeing/toggle';
import { Select } from '../templates/table-treeing/select';
import { Stepper } from '../templates/table-treeing/stepper';
import { Cell } from '../templates/table-treeing/cell';

export class TableTreeing extends React.PureComponent {
  render() {
    return (
      <TableTreeingBase
        toggleComponent={Toggle}
        selectComponent={Select}
        stepperComponent={Stepper}
        cellComponent={Cell}
        {...this.props}
      />
    );
  }
}

TableTreeing.Toggle = Toggle;
