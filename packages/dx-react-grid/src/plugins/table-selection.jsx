import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';

const getSelectTableCellTemplateArgs = (
  params,
  { selection },
  { toggleSelection },
) => ({
  ...params,
  row: params.tableRow.row,
  selected: selection.has(params.tableRow.rowId),
  changeSelected: () => toggleSelection({ rowIds: [params.tableRow.rowId] }),
});

const getSelectAllTableCellTemplateArgs = (
  params,
  { selectAllAvailable, allSelected, someSelected },
  { toggleSelectAll },
) => ({
  ...params,
  selectionAvailable: selectAllAvailable,
  allSelected,
  someSelected,
  toggleAll: select => toggleSelectAll(select),
});

const getSelectTableRowTemplateArgs = (
  { selectByRowClick, highlightSelected, ...restParams },
  { selection },
  { toggleSelection },
) => {
  const { rowId } = restParams.tableRow;
  return ({
    ...restParams,
    selectByRowClick,
    selected: highlightSelected && selection.has(rowId),
    changeSelected: () => toggleSelection({ rowIds: [rowId] }),
  });
};

export class TableSelection extends React.PureComponent {
  render() {
    const {
      highlightSelected,
      showSelectionColumn,
      showSelectAll,
      selectionColumnWidth,
      selectAllCellTemplate,
      selectCellTemplate,
      selectRowTemplate,
      selectByRowClick,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithSelection(tableColumns, selectionColumnWidth);

    return (
      <PluginContainer
        pluginName="TableSelection"
        dependencies={[
          { pluginName: 'Table' },
          { pluginName: 'SelectionState' },
          { pluginName: 'LocalSelection', optional: !showSelectAll },
        ]}
      >
        {showSelectionColumn && (
          <Getter name="tableColumns" computed={tableColumnsComputed} />
        )}

        {(showSelectionColumn && showSelectAll) && (
          <Template
            name="tableCell"
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
            name="tableCell"
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
        {(highlightSelected || selectByRowClick) && (
          <Template
            name="tableRow"
            predicate={({ tableRow }) => isDataTableRow(tableRow)}
          >
            {params => (
              <TemplateConnector>
                {(getters, actions) => (
                  <TemplateRenderer
                    template={selectRowTemplate}
                    params={
                      getSelectTableRowTemplateArgs({
                        selectByRowClick,
                        highlightSelected,
                        ...params,
                      }, getters, actions)
                    }
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
  selectRowTemplate: PropTypes.func.isRequired,
  highlightSelected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  showSelectionColumn: PropTypes.bool,
  selectionColumnWidth: PropTypes.number.isRequired,
};

TableSelection.defaultProps = {
  highlightSelected: false,
  selectByRowClick: false,
  showSelectAll: false,
  showSelectionColumn: true,
};
