import React from 'react';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  extractTemplates,
  combineTemplates,
} from '@devexpress/dx-react-core';

const CellTemplate = params =>
  <TemplatePlaceholder name="tableViewCell" params={params} />;

export const TableViewCellTemplate = () => null;
TableViewCellTemplate.propTypes = {
  predicate: React.PropTypes.func,
  children: React.PropTypes.func.isRequired,
};
TableViewCellTemplate.defaultProps = {
  predicate: undefined,
};

export class TableView extends React.PureComponent {
  componentWillMount() {
    const { children, cellTemplate } = this.props;
    this.updateTemplates(children, cellTemplate);
  }
  componentWillReceiveProps(nextProps) {
    const { children, cellTemplate } = nextProps;
    this.updateTemplates(children, cellTemplate);
  }
  updateTemplates(children, cellTemplate) {
    const dataCellTemplates = extractTemplates(children, TableViewCellTemplate);
    this._dataCellTemplate = combineTemplates(dataCellTemplates, cellTemplate);
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
          {this._dataCellTemplate}
        </Template>
      </div>
    );
  }
}

TableView.propTypes = {
  tableTemplate: React.PropTypes.func.isRequired,
  cellTemplate: React.PropTypes.func.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};
