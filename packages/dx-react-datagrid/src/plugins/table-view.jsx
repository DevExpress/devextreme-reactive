import React from 'react';
import { Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export const CellContentTemplate = ({ row, column }) =>
  <TemplatePlaceholder name="tableViewCell" params={{ row, column }} />;

CellContentTemplate.propTypes = {
  row: React.PropTypes.object.isRequired,
  column: React.PropTypes.object.isRequired,
};

export class TableView extends React.PureComponent {
  constructor(props) {
    super(props);

    this._getCellInfo = ({ row, columnIndex, columns }) => {
      if (row.colspan !== undefined && columnIndex > row.colspan) { return { skip: true }; }
      const colspan = row.colspan === columnIndex ? columns.length - row.colspan : 1;
      return { colspan };
    };
  }
  render() {
    const { tableTemplate } = this.props;
    const Table = tableTemplate;

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

        <Template name="gridBody">
          <TemplatePlaceholder name="tableView" />
        </Template>
        <Template
          name="tableView"
          connectGetters={getter => ({
            headerRows: getter('tableHeaderRows'),
            bodyRows: getter('tableBodyRows'),
            columns: getter('tableColumns'),
          })}
          connectActions={action => ({
            onClick: action('tableClick'),
          })}
        >
          {({ headerRows, bodyRows, columns, onClick }) => (
            <Table
              headerRows={headerRows}
              bodyRows={bodyRows}
              columns={columns}
              getCellInfo={this._getCellInfo}
              cellContentTemplate={CellContentTemplate}
              onClick={onClick}
            />
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ row, column }) => row[column.name] !== undefined}
        >
          {({ row, column }) => (
            <span>{row[column.name]}</span>
          )}
        </Template>
      </div>
    );
  }
}

TableView.propTypes = {
  tableTemplate: React.PropTypes.func.isRequired,
};
