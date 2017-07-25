import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';

const cellTemplate = params =>
  <TemplatePlaceholder name="tableViewCell" params={params} />;

export class TableView extends React.PureComponent {
  render() {
    const {
      tableTemplate,
      tableCellTemplate,
      tableNoDataCellTemplate,
      tableStubCellTemplate,
      tableStubHeaderCellTemplate,
      allowColumnReordering,
    } = this.props;

    return (
      <PluginContainer>
        <Getter name="tableHeaderRows" value={[]} />
        <Getter
          name="tableBodyRows"
          pureComputed={rows => (rows.length ? rows : [{ type: 'nodata', colSpanStart: 0 }])}
          connectArgs={getter => [
            getter('rows'),
          ]}
        />
        <Getter
          name="tableColumns"
          pureComputed={columns => columns}
          connectArgs={getter => [
            getter('columns'),
          ]}
        />
        <Getter name="tableExtraProps" value={{}} />

        <Template
          name="body"
          connectGetters={getter => ({
            headerRows: getter('tableHeaderRows'),
            bodyRows: getter('tableBodyRows'),
            columns: getter('tableColumns'),
            getRowId: getter('getRowId'),
            cellTemplate,
            allowColumnReordering,
            ...getter('tableExtraProps'),
          })}
          connectActions={action => ({
            setColumnOrder: action('setColumnOrder'),
          })}
        >
          {tableTemplate}
        </Template>
        <Template
          name="tableViewCell"
          connectGetters={getter => ({
            headerRows: getter('tableHeaderRows'),
          })}
        >
          {({ row, column, headerRows, ...restParams }) => (
            headerRows.indexOf(row) > -1
              ? tableStubHeaderCellTemplate(restParams)
              : tableStubCellTemplate(restParams)
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ row, column }) => !column.type && !row.type}
        >
          {tableCellTemplate}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ row }) => row.type === 'nodata'}
        >
          {({ row, column, ...restParams }) => tableNoDataCellTemplate(restParams)}
        </Template>
      </PluginContainer>
    );
  }
}

TableView.propTypes = {
  tableTemplate: PropTypes.func.isRequired,
  tableCellTemplate: PropTypes.func.isRequired,
  tableNoDataCellTemplate: PropTypes.func.isRequired,
  tableStubCellTemplate: PropTypes.func.isRequired,
  tableStubHeaderCellTemplate: PropTypes.func.isRequired,
  allowColumnReordering: PropTypes.bool,
};

TableView.defaultProps = {
  allowColumnReordering: false,
};
