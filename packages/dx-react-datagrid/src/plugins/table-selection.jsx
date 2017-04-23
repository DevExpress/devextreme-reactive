import React from 'react';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import extendWithEventListener from '../utils/extendWithEventListener';

export class TableSelection extends React.PureComponent {
  constructor(props) {
    super(props);

    this._tableColumns = tableColumns =>
      [{ type: 'select', name: 'select', width: 30 }, ...tableColumns];

    this._tableBodyRows = (tableBodyRows, selection) => {
      const selectionSet = new Set(selection);
      return tableBodyRows
        .map((row) => {
          if (!selectionSet.has(row.id)) return row;
          return Object.assign({ selected: true }, row);
        });
    };

    this._tableExtraProps = (tableExtraProps, availableToSelect, setRowSelection) =>
      extendWithEventListener(tableExtraProps, 'onClick', ({ row }) => {
        const rowId = row.id;
        if (availableToSelect.indexOf(rowId) === -1) return;
        setRowSelection({ rowId });
      });
  }
  render() {
    const { highlightSelected, selectByRowClick, showCheckboxes, showSelectAll } = this.props;
    const SelectAllCell = this.props.selectAllCellTemplate;
    const SelectCell = this.props.selectCellTemplate;

    return (
      <PluginContainer>
        {showCheckboxes && (
          <Getter
            name="tableColumns"
            pureComputed={this._tableColumns}
            connectArgs={getter => [
              getter('tableColumns'),
            ]}
          />
        )}
        {highlightSelected && (
          <Getter
            name="tableBodyRows"
            pureComputed={this._tableBodyRows}
            connectArgs={getter => [
              getter('tableBodyRows'),
              getter('selection'),
            ]}
          />
        )}
        {selectByRowClick && (
          <Getter
            name="tableExtraProps"
            pureComputed={this._tableExtraProps}
            connectArgs={(getter, action) => [
              getter('tableExtraProps'),
              getter('availableToSelect'),
              action('setRowSelection'),
            ]}
          />
        )}

        {(showCheckboxes && showSelectAll) && (
          <Template
            name="tableViewCell"
            predicate={({ column, row }) => column.type === 'select' && row.type === 'heading'}
            connectGetters={(getter) => {
              const availableToSelect = getter('availableToSelect');
              const selection = getter('selection');
              const selectionExists = selection.length !== 0;
              return {
                availableToSelect,
                allSelected: selection.length === availableToSelect.length && selectionExists,
                someSelected: selection.length !== availableToSelect.length && selectionExists,
              };
            }}
            connectActions={action => ({
              toggleAll: availableToSelect => action('setRowsSelection')({ rowIds: availableToSelect }),
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
        )}
        {showCheckboxes && (
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
        )}
      </PluginContainer>
    );
  }
}
TableSelection.defaultProps = {
  highlightSelected: false,
  selectByRowClick: false,
  showSelectAll: true,
  showCheckboxes: true,
};
TableSelection.propTypes = {
  selectAllCellTemplate: React.PropTypes.func.isRequired,
  selectCellTemplate: React.PropTypes.func.isRequired,
  highlightSelected: React.PropTypes.bool,
  selectByRowClick: React.PropTypes.bool,
  showSelectAll: React.PropTypes.bool,
  showCheckboxes: React.PropTypes.bool,
};
