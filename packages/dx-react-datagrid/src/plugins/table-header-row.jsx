import React from 'react';
import { Getter } from '@devexpress/dx-react-core';

export class TableHeaderRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableHeaderRows = (tableHeaderRows, columns) => [columns.reduce((accumulator, c) => {
      const headerRow = accumulator;
      headerRow[c.name] = c.title;
      return headerRow;
    }, { type: 'heading' }), ...tableHeaderRows];
  }
  render() {
    return (
      <div>
        <Getter
          name="tableHeaderRows"
          pureComputed={this._tableHeaderRows}
          connectArgs={getter => [
            getter('tableHeaderRows')(),
            getter('columns')(),
          ]}
        />
      </div>
    );
  }
}
