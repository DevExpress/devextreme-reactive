import { getTableRowColumnsWithColSpan } from '@devexpress/dx-grid-core';

export const TableLayout = {
  props: {
    cellComponent: {},
    rowComponent: {},
    bodyComponent: {},
    headComponent: {},
    tableComponent: {},
    containerComponent: {},
    columns: {},
    bodyRows: {},
    headerRows: {},
  },
  render() {
    const {
      cellComponent: Cell,
      rowComponent: Row,
      bodyComponent: Body,
      headComponent: Head,
      tableComponent: Table,
      containerComponent: Container,
      columns,
      bodyRows,
      headerRows,
    } = this;
    return (
      <Container>
        <Table>
          <Head>
            {headerRows.map(row => (
              <Row
                key={row.key}
                tableRow={row}
              >
                {getTableRowColumnsWithColSpan(columns, row.colSpanStart).map(column => (
                  <Cell
                    key={column.key}
                    tableRow={row}
                    tableColumn={column}
                  />
                ))}
              </Row>
            ))}
          </Head>
          <Body>
            {bodyRows.map(row => (
              <Row
                key={row.key}
                tableRow={row}
              >
                {getTableRowColumnsWithColSpan(columns, row.colSpanStart).map(column => (
                  <Cell
                    key={column.key}
                    tableRow={row}
                    tableColumn={column}
                    colSpan={column.colSpan}
                  />
                ))}
              </Row>
            ))}
          </Body>
        </Table>
      </Container>
    );
  },
};
