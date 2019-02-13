import * as React from 'react';
import { ColumnGroup } from './column-group';
import { RowsBlockLayout } from './rows-block-layout';
import { TableLayoutProps } from '../../types';

const defaultProps = {
  headerRows: [],
  footerRows: [],
  headComponent: () => null,
  footerComponent: () => null,
};

/** @internal */
export class StaticTableLayout extends React.PureComponent<TableLayoutProps & typeof defaultProps> {
  static defaultProps = defaultProps;

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
      tableRef,
    } = this.props;

    return (
      <Container>
        <Table
          tableRef={tableRef}
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
