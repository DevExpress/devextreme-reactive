import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithSelection,
  tableRowsWithSelection,
  tableExtraPropsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
} from '@devexpress/dx-grid-core';

const getSelectTableCellTemplateArgs = (
  params,
  { selection },
  { setRowsSelection },
) => ({
  ...params,
  row: params.tableRow.row,
  selected: selection.indexOf(params.tableRow.rowId) > -1,
  changeSelected: () => setRowsSelection({ rowIds: [params.tableRow.rowId] }),
});

const getSelectAllTableCellTemplateArgs = (
  params,
  { availableToSelect, selection },
  { setRowsSelection },
) => ({
  ...params,
  selectionAvailable: !!availableToSelect.length,
  allSelected: selection.length === availableToSelect.length && selection.length !== 0,
  someSelected: selection.length !== availableToSelect.length && selection.length !== 0,
  toggleAll: () => setRowsSelection({ rowIds: availableToSelect }),
});

const pluginDependencies = [
  { pluginName: 'SelectionState' },
  { pluginName: 'TableView' },
];

const tableExtraPropsComputed = ({ tableExtraProps }, { setRowsSelection }) =>
  tableExtraPropsWithSelection(tableExtraProps, setRowsSelection);
const tableBodyRowsComputed = ({ tableBodyRows, selection }) =>
  tableRowsWithSelection(tableBodyRows, selection);

export class TableSelection extends React.PureComponent {
  render() {
    const {
      highlightSelected,
      selectByRowClick,
      showSelectionColumn,
      showSelectAll,
      selectionColumnWidth,
      selectAllCellTemplate,
      selectCellTemplate,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithSelection(tableColumns, selectionColumnWidth);

    return (
      <PluginContainer
        pluginName="TableSelection"
        dependencies={pluginDependencies}
      >
        {showSelectionColumn && (
          <Getter name="tableColumns" computed={tableColumnsComputed} />
        )}
        {highlightSelected && (
          <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        )}
        {selectByRowClick && (
          <Getter name="tableExtraProps" computed={tableExtraPropsComputed} />
        )}

        {(showSelectionColumn && showSelectAll) && (
          <Template
            name="tableViewCell"
            predicate={({ tableRow, tableColumn }) => isSelectAllTableCell(tableRow, tableColumn)}
          >
            {params => (
              <TemplateConnector>
                {(getters, actions) => (
                  <TemplateRenderer
                    template={selectAllCellTemplate}
                    params={getSelectAllTableCellTemplateArgs(params, getters, actions)}
                  />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
        {showSelectionColumn && (
          <Template
            name="tableViewCell"
            predicate={({ tableRow, tableColumn }) => isSelectTableCell(tableRow, tableColumn)}
          >
            {params => (
              <TemplateConnector>
                {(getters, actions) => (
                  <TemplateRenderer
                    template={selectCellTemplate}
                    params={getSelectTableCellTemplateArgs(params, getters, actions)}
                  />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
      </PluginContainer>
    );
  }
}

TableSelection.propTypes = {
  selectAllCellTemplate: PropTypes.func.isRequired,
  selectCellTemplate: PropTypes.func.isRequired,
  highlightSelected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  showSelectionColumn: PropTypes.bool,
  selectionColumnWidth: PropTypes.number.isRequired,
};

TableSelection.defaultProps = {
  highlightSelected: false,
  selectByRowClick: false,
  showSelectAll: true,
  showSelectionColumn: true,
};
