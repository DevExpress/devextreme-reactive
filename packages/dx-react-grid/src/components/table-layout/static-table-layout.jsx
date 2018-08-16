import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ColumnGroup } from './column-group';
import { RowsBlockLayout } from './rows-block-layout';

export class StaticTableLayout extends React.PureComponent {
  render() {
    const {
      headerRows,
      bodyRows,
      footerRows,
      columns,
      minWidth,
      containerComponent: Container,
      tableComponent: Table,
      headComponent,
      bodyComponent,
      footerComponent,
      rowComponent,
      cellComponent,
      getCellColSpan,
    } = this.props;

    return (
      <Container>
        <Table
          style={{ minWidth: `${minWidth}px` }}
        >
          <ColumnGroup columns={columns} />
          {!!headerRows.length && (
            <RowsBlockLayout
              rows={headerRows}
              columns={columns}
              blockComponent={headComponent}
              rowComponent={rowComponent}
              cellComponent={cellComponent}
              getCellColSpan={getCellColSpan}
            />
          )}
          <RowsBlockLayout
            rows={bodyRows}
            columns={columns}
            blockComponent={bodyComponent}
            rowComponent={rowComponent}
            cellComponent={cellComponent}
            getCellColSpan={getCellColSpan}
          />
          {!!footerRows.length && (
            <RowsBlockLayout
              rows={footerRows}
              columns={columns}
              blockComponent={footerComponent}
              rowComponent={rowComponent}
              cellComponent={cellComponent}
              getCellColSpan={getCellColSpan}
            />
          )}
        </Table>
      </Container>
    );
  }
}

StaticTableLayout.propTypes = {
  headerRows: PropTypes.array,
  bodyRows: PropTypes.array.isRequired,
  footerRows: PropTypes.array,
  columns: PropTypes.array.isRequired,
  minWidth: PropTypes.number.isRequired,
  containerComponent: PropTypes.func.isRequired,
  tableComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func,
  bodyComponent: PropTypes.func.isRequired,
  footerComponent: PropTypes.func,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  getCellColSpan: PropTypes.func.isRequired,
};

StaticTableLayout.defaultProps = {
  headerRows: [],
  footerRows: [],
  headComponent: () => null,
  footerComponent: () => null,
};
