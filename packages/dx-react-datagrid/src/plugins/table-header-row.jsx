import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';

export class TableHeaderRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableHeaderRows = tableHeaderRows =>
      [{ type: 'heading', id: 'heading' }, ...tableHeaderRows];
  }
  render() {
    const { headerCellTemplate } = this.props;
    const HeaderCell = headerCellTemplate;

    return (
      <div>
        <Getter
          name="tableHeaderRows"
          pureComputed={this._tableHeaderRows}
          connectArgs={getter => [
            getter('tableHeaderRows'),
          ]}
        />
        <Template
          name="tableViewCell"
          predicate={({ row }) => row.type === 'heading'}
        >
          {params => (
            <HeaderCell {...params} />
          )}
        </Template>
      </div>
    );
  }
}

TableHeaderRow.propTypes = {
  headerCellTemplate: React.PropTypes.func.isRequired,
};
