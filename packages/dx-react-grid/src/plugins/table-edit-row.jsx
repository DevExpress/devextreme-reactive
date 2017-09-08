import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditNewTableCell,
  isEditExistingTableCell,
} from '@devexpress/dx-grid-core';

const getEditExistingTableCellTemplateArgs = ({
  params,
  getters: { changedRows, getCellData, createRowChange },
  actions: { changeRow },
}) => {
  const { rowId, row } = params.tableRow;
  const { column } = params.tableColumn;
  const changedRow = { ...row, ...getRowChange(changedRows, rowId) };
  return {
    ...params,
    row,
    column,
    value: getCellData(changedRow, column.name),
    onValueChange: newValue =>
      changeRow({
        rowId,
        change: createRowChange(changedRow, column.name, newValue),
      }),
  };
};

const getEditNewTableCellTemplateArgs = ({
  params,
  getters: { getCellData, createRowChange },
  actions: { changeAddedRow },
}) => {
  const { rowId, row } = params.tableRow;
  const { column } = params.tableColumn;
  return {
    ...params,
    row,
    column,
    value: getCellData(row, column.name),
    onValueChange: newValue =>
      changeAddedRow({
        rowId,
        change: createRowChange(row, column.name, newValue),
      }),
  };
};

const pluginDependencies = [
  { pluginName: 'EditingState' },
  { pluginName: 'TableView' },
];

export class TableEditRow extends React.PureComponent {
  render() {
    const { editCellTemplate, rowHeight } = this.props;

    const tableBodyRowsComputed = ({ tableBodyRows, editingRows, addedRows }) =>
      tableRowsWithEditing(tableBodyRows, editingRows, addedRows, rowHeight);

    return (
      <PluginContainer
        pluginName="TableEditRow"
        dependencies={pluginDependencies}
      >
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isEditExistingTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={editCellTemplate}
                  params={getEditExistingTableCellTemplateArgs({
                    params,
                    getters,
                    actions,
                  })}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isEditNewTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={editCellTemplate}
                  params={getEditNewTableCellTemplateArgs({
                    params,
                    getters,
                    actions,
                  })}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
      </PluginContainer>
    );
  }
}
TableEditRow.propTypes = {
  rowHeight: PropTypes.any,
  editCellTemplate: PropTypes.func.isRequired,
};
TableEditRow.defaultProps = {
  rowHeight: undefined,
};
