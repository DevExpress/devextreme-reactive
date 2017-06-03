import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';

const cellTemplate = params =>
  <TemplatePlaceholder name="tableViewCell" params={params} />;

export class TableView extends React.PureComponent {
  render() {
    const { tableTemplate, tableCellTemplate, tableNoDataCellTemplate } = this.props;

    return (
      <PluginContainer>
        <Getter name="tableHeaderRows" value={[]} />
        <Getter
          name="tableBodyRows"
          pureComputed={rows => (rows.length ? rows : [{ type: 'nodata', colspan: 0 }])}
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

        <Template name="body">
          <TemplatePlaceholder name="tableView" />
        </Template>
        <Template
          name="tableView"
          connectGetters={getter => ({
            headerRows: getter('tableHeaderRows'),
            bodyRows: getter('tableBodyRows'),
            columns: getter('tableColumns'),
            getRowId: getter('getRowId'),
            cellTemplate,
            ...getter('tableExtraProps'),
          })}
        >
          {tableTemplate}
        </Template>
        <Template
          name="tableViewCell"
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
};
