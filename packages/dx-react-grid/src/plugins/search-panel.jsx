import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  TemplatePlaceholder,
  Plugin,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  getMessagesFormatter,
  isDataTableCell,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'SearchState' },
];

export class SearchPanel extends React.PureComponent {
  render() {
    const {
      messages,
      inputComponent: Input,
      cellComponent: Cell,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="SearchPanel"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ searchValue }, { changeSearchValue }) => (
              <Input
                value={searchValue}
                onValueChange={changeSearchValue}
                getMessage={getMessage}
              />
            )}
          </TemplateConnector>
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isDataTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ getCellValue, searchValue }) => {
                const columnName = params.tableColumn.column.name;
                const value = getCellValue(params.tableRow.row, columnName);
                const isSearchedCell = !!searchValue && value.toLowerCase().search(searchValue.toLowerCase()) > -1;
                if (isSearchedCell) {
                  return (
                    <TemplatePlaceholder
                      name="valueFormatter"
                      params={{
                        row: params.tableRow.row,
                        column: params.tableColumn.column,
                        value,
                      }}
                    >
                      {content => (
                        <Cell
                          {...params}
                          row={params.tableRow.row}
                          column={params.tableColumn.column}
                          value={value}
                          searchValue={searchValue}
                        >
                          {content}
                        </Cell>
                      )}
                    </TemplatePlaceholder>
                  );
                } return <TemplatePlaceholder />;
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

SearchPanel.propTypes = {
  inputComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

SearchPanel.defaultProps = {
  messages: {},
};
