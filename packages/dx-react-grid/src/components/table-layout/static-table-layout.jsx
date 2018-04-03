import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ColumnGroup } from './column-group';
import { RowsBlockLayout } from './rows-block-layout';

export class StaticTableLayout extends React.PureComponent {
  render() {
    const {
      headerRows,
      bodyRows,
      columns,
      minWidth,
      containerComponent: Container,
      tableComponent: Table,
      headComponent,
      bodyComponent,
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
        </Table>
      </Container>
    );
  }
}

StaticTableLayout.propTypes = {
  headerRows: PropTypes.array,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  minWidth: PropTypes.number.isRequired,
  containerComponent: PropTypes.func.isRequired,
  tableComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func,
  bodyComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  getCellColSpan: PropTypes.func.isRequired,
};

StaticTableLayout.defaultProps = {
  headerRows: [],
  headComponent: () => null,
};
