import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { tableColumnsWithSelection, tableBodyRowsWithSelection, tableExtraProps } from '@devexpress/dx-grid-core';

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

    return (
      <PluginContainer>
        {showSelectionColumn && (
          <Getter
            name="tableColumns"
            pureComputed={tableColumnsWithSelection}
            connectArgs={getter => [
              getter('tableColumns'),
              selectionColumnWidth,
            ]}
          />
        )}
        {highlightSelected && (
          <Getter
            name="tableBodyRows"
            pureComputed={tableBodyRowsWithSelection}
            connectArgs={getter => [
              getter('tableBodyRows'),
              getter('selection'),
              getter('getRowId'),
            ]}
          />
        )}
        {selectByRowClick && (
          <Getter
            name="tableExtraProps"
            pureComputed={tableExtraProps}
            connectArgs={(getter, action) => [
              getter('tableExtraProps'),
              getter('availableToSelect'),
              action('setRowSelection'),
              getter('getRowId'),
            ]}
          />
        )}

        {(showSelectionColumn && showSelectAll) && (
          <Template
            name="tableViewCell"
            predicate={({ column, row }) => column.type === 'select' && row.type === 'heading'}
            connectGetters={(getter) => {
              const availableToSelect = getter('availableToSelect');
              const selection = getter('selection');
              const selectionExists = selection.length !== 0;
              return {
                availableToSelect,
                selectionAvailable: !!availableToSelect.length,
                allSelected: selection.length === availableToSelect.length && selectionExists,
                someSelected: selection.length !== availableToSelect.length && selectionExists,
              };
            }}
            connectActions={action => ({
              toggleAll: availableToSelect => action('setRowsSelection')({ rowIds: availableToSelect }),
            })}
          >
            {({ toggleAll, availableToSelect, ...restParams }) => selectAllCellTemplate({
              ...restParams,
              toggleAll: () => toggleAll(availableToSelect),
            })}
          </Template>
        )}
        {showSelectionColumn && (
          <Template
            name="tableViewCell"
            predicate={({ column, row }) => column.type === 'select' && !row.type}
            connectGetters={(getter, { row }) => ({
              rowId: getter('getRowId')(row),
              selection: getter('selection'),
            })}
            connectActions={action => ({
              toggleSelected: ({ rowId }) => action('setRowSelection')({ rowId }),
            })}
          >
            {({ rowId, selection, toggleSelected, ...restParams }) => selectCellTemplate({
              ...restParams,
              selected: selection.indexOf(rowId) > -1,
              changeSelected: () => toggleSelected({ rowId }),
            })}
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
  showSelectionColumn: true,
};
TableSelection.propTypes = {
  selectAllCellTemplate: PropTypes.func.isRequired,
  selectCellTemplate: PropTypes.func.isRequired,
  highlightSelected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  showSelectionColumn: PropTypes.bool,
  selectionColumnWidth: PropTypes.number.isRequired,
};
