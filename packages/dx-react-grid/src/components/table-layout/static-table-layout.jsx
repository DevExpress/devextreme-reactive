import React from 'react';
import PropTypes from 'prop-types';
import { TemplateRenderer } from '@devexpress/dx-react-core';
import { ColumnGroup } from './column-group';
import { RowsBlockLayout } from './rows-block-layout';

export class StaticTableLayout extends React.PureComponent {
  render() {
    const {
      headerRows,
      rows,
      columns,
      minWidth,
      containerTemplate,
      tableTemplate,
      headTemplate,
      bodyTemplate,
      rowTemplate,
      cellTemplate,
    } = this.props;

    return (
      <TemplateRenderer
        template={containerTemplate}
      >
        <TemplateRenderer
          template={tableTemplate}
          params={{
            style: {
              minWidth: `${minWidth}px`,
            },
          }}
        >
          <ColumnGroup columns={columns} />
          {!!headerRows.length && (
            <RowsBlockLayout
              key="head"
              rows={headerRows}
              columns={columns}
              blockTemplate={headTemplate}
              rowTemplate={rowTemplate}
              cellTemplate={cellTemplate}
            />
          )}
          <RowsBlockLayout
            key="body"
            rows={rows}
            columns={columns}
            blockTemplate={bodyTemplate}
            rowTemplate={rowTemplate}
            cellTemplate={cellTemplate}
          />
        </TemplateRenderer>
      </TemplateRenderer>
    );
  }
}

StaticTableLayout.propTypes = {
  headerRows: PropTypes.array,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  minWidth: PropTypes.number.isRequired,
  containerTemplate: PropTypes.func.isRequired,
  tableTemplate: PropTypes.func.isRequired,
  headTemplate: PropTypes.func,
  bodyTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  cellTemplate: PropTypes.func.isRequired,
};

StaticTableLayout.defaultProps = {
  headerRows: [],
  headTemplate: () => null,
};
