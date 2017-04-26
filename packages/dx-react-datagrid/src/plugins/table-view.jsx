import React from 'react';
import { Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const CellTemplate = params =>
  <TemplatePlaceholder name="tableViewCell" params={params} />;

export class TableView extends React.PureComponent {
  render() {
    const { tableTemplate, tableCellTemplate } = this.props;
    const Table = tableTemplate;
    const TableCell = tableCellTemplate;

    return (
      <div>
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
          })}
        >
          {({ headerRows, bodyRows, columns, extraProps }) => (
            <Table
              headerRows={headerRows}
              bodyRows={bodyRows}
              columns={columns}
              cellTemplate={CellTemplate}
              {...extraProps}
            />
          )}
        </Template>
        <Template
          name="tableViewCell"
        >
          {props => <TableCell {...props} />}
        </Template>
      </div>
    );
  }
}

TableView.propTypes = {
  tableTemplate: React.PropTypes.func.isRequired,
  tableCellTemplate: React.PropTypes.func.isRequired,
};
