import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';

export class TableColumnSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = tableColumns => [{ type: 'select', name: 'select', width: 20 }, ...tableColumns];
  }
  render() {
    const SelectAllCell = this.props.selectAllCellTemplate;
    const SelectCell = this.props.selectCellTemplate;

    return (
      <div>
        <Getter
          name="tableColumns"
          pureComputed={this._tableColumns}
          connectArgs={getter => [
            getter('tableColumns')(),
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => column.type === 'select' && row.type === 'heading'}
          connectGetters={(getter) => {
            const rows = getter('rows')();
            const selection = getter('selection')();
            return {
              rows,
              allSelected: selection.length === rows.length,
              someSelected: selection.length !== rows.length && selection.length !== 0,
            };
          }}
          connectActions={action => ({
            toggleAll: rows => action('toggleAllSelection')({ rows }),
          })}
        >
          {({ allSelected, someSelected, toggleAll, rows }) =>
            <SelectAllCell
              allSelected={allSelected}
              someSelected={someSelected}
              toggleAll={() => toggleAll(rows)}
            />}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => column.type === 'select' && !row.type}
          connectGetters={(getter, { row }) => ({
            selected: getter('selection')().indexOf(row.id) > -1,
          })}
          connectActions={(action, { row }) => ({
            toggleSelected: () => action('setRowSelection')({ row }),
          })}
        >
          {({ selected, toggleSelected }) => (
            <SelectCell selected={selected} changeSelected={toggleSelected} />
          )}
        </Template>
      </div>
    );
  }
}

TableColumnSelection.propTypes = {
  selectAllCellTemplate: React.PropTypes.func.isRequired,
  selectCellTemplate: React.PropTypes.func.isRequired,
};
