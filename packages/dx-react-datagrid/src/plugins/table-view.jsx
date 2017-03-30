import React from 'react';
import { Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export const CellContentTemplate = ({ row, column }) =>
  <TemplatePlaceholder name="tableViewCell" params={{ row, column }} />;

CellContentTemplate.propTypes = {
  row: React.PropTypes.object,
  column: React.PropTypes.object,
};

CellContentTemplate.defaultProps = {
  row: undefined,
  column: undefined,
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
    const { tableTemplate, rowTemplate, cellTemplate } = this.props;
    const Table = tableTemplate;

    return (
      <div>
        <Getter name="tableHeaderRows" value={[]} />
        <Getter
          name="tableBodyRows"
          pureComputed={rows => rows}
          connectArgs={getter => [
            getter('rows')(),
          ]}
        />
        <Getter
          name="tableColumns"
          pureComputed={columns => columns}
          connectArgs={getter => [
            getter('columns')(),
          ]}
        />

        <Template name="gridBody">
          <TemplatePlaceholder name="tableView" />
        </Template>
        <Template
          name="tableView"
          connectGetters={getter => ({
            headerRows: getter('tableHeaderRows')(),
            bodyRows: getter('tableBodyRows')(),
            columns: getter('tableColumns')(),
          })}
        >
          {({ headerRows, bodyRows, columns }) => <Table
            headerRows={headerRows}
            bodyRows={bodyRows}
            columns={columns}
            getCellInfo={this._getCellInfo}
            cellContentTemplate={CellContentTemplate}
            cellTemplate={cellTemplate}
            rowTemplate={rowTemplate}
          />}
        </Template>
        <Template name="tableViewCell">
          {({ row, column }) => (
            row[column.name] !== undefined ? <span>{row[column.name]}</span> : null
          )}
        </Template>
      </div>
    );
  }
}

TableView.propTypes = {
  tableTemplate: React.PropTypes.func.isRequired,
  rowTemplate: React.PropTypes.func,
  cellTemplate: React.PropTypes.func,
};

TableView.defaultProps = {
  rowTemplate: undefined,
  cellTemplate: undefined,
};
