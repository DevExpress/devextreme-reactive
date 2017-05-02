import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';

const CellTemplate = params =>
  <TemplatePlaceholder name="tableViewCell" params={params} />;

export class TableView extends React.PureComponent {
  render() {
    const { tableTemplate, tableCellTemplate } = this.props;
    const Table = tableTemplate;

    return (
      <PluginContainer>
        <Getter name="tableHeaderRows" value={[]} />
        <Getter
          name="tableBodyRows"
          pureComputed={rows => rows}
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

        <Template name="gridBody">
          <TemplatePlaceholder name="tableView" />
        </Template>
        <Template
          name="tableView"
          connectGetters={getter => ({
            headerRows: getter('tableHeaderRows'),
            bodyRows: getter('tableBodyRows'),
            columns: getter('tableColumns'),
            extraProps: getter('tableExtraProps'),
            getRowId: getter('getRowId'),
          })}
        >
          {({ headerRows, bodyRows, columns, getRowId, extraProps }) => (
            <Table
              headerRows={headerRows}
              bodyRows={bodyRows}
              columns={columns}
              cellTemplate={CellTemplate}
              getRowId={getRowId}
              {...extraProps}
            />
          )}
        </Template>
        <Template
          name="tableViewCell"
        >
          {tableCellTemplate}
        </Template>
      </PluginContainer>
    );
  }
}

TableView.propTypes = {
  tableTemplate: PropTypes.func.isRequired,
  tableCellTemplate: PropTypes.func.isRequired,
};
