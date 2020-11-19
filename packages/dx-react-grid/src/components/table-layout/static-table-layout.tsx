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

    const commonProps = {
      columns,
      rowComponent,
      cellComponent,
      getCellColSpan,
    };

    return (
      <Container>
        <Table
          forwardedRef={tableRef}
          style={{ minWidth: `calc(${minWidth})` }}
        >
          <ColumnGroup columns={columns} />
          {!!headerRows.length && (
            <RowsBlockLayout
              rows={headerRows}
              blockComponent={headComponent}
              {...commonProps}
            />
          )}
          <RowsBlockLayout
            rows={bodyRows}
            blockComponent={bodyComponent}
            {...commonProps}
          />
          {!!footerRows.length && (
            <RowsBlockLayout
              rows={footerRows}
              blockComponent={footerComponent}
              {...commonProps}
            />
          )}
        </Table>
      </Container>
    );
  }
}
