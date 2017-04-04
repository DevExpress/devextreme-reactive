import React from 'react';
import { Getter, Template } from '@devexpress/dx-react-core';

export class TableColumnSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = tableColumns => [{ type: 'select', name: 'select', width: 20 }, ...tableColumns];
  }
  render() {
    const { showSelectAll } = this.props;
    const SelectAllCell = this.props.selectAllCellTemplate;
    const SelectCell = this.props.selectCellTemplate;

    return (
      <div>
        <Getter
          name="tableColumns"
          pureComputed={this._tableColumns}
          connectArgs={getter => [
            getter('tableColumns'),
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => showSelectAll && column.type === 'select' && row.type === 'heading'}
          connectGetters={(getter) => {
            const availableToSelect = getter('availableToSelect');
            const selection = getter('selection');
            return {
              availableToSelect,
              allSelected: selection.length === availableToSelect.length && selection.length !== 0,
              someSelected: selection.length !== availableToSelect.length && selection.length !== 0,
            };
          }}
          connectActions={action => ({
            toggleAll: availableToSelect => action('toggleAllSelection')({ rowIds: availableToSelect }),
          })}
        >
          {({ allSelected, someSelected, toggleAll, availableToSelect }) => (
            <SelectAllCell
              allSelected={allSelected}
              someSelected={someSelected}
              toggleAll={() => toggleAll(availableToSelect)}
            />
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ column, row }) => column.type === 'select' && !row.type}
          connectGetters={(getter, { row }) => ({
            selected: getter('selection').indexOf(row.id) > -1,
          })}
          connectActions={(action, { row }) => ({
            toggleSelected: () => action('setRowSelection')({ rowId: row.id }),
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
TableColumnSelection.defaultProps = {
  showSelectAll: true,
};
TableColumnSelection.propTypes = {
  selectAllCellTemplate: React.PropTypes.func.isRequired,
  selectCellTemplate: React.PropTypes.func.isRequired,
  showSelectAll: React.PropTypes.bool,
};
