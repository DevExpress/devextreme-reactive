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
      tableComponent: Table1,
      containerComponent: Container,
      columns,
      bodyRows,
      headerRows,
    } = this;
    return (
      <Container>
        <Table1>
          <Head>
            {headerRows.map(row => (
              <Row
                key={row.key}
                tableRow={row}
              >
                {columns.map(column => (
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
                {columns.map(column => (
                  <Cell
                    key={column.key}
                    tableRow={row}
                    tableColumn={column}
                  />
                ))}
              </Row>
            ))}
          </Body>
        </Table1>
      </Container>
    );
  },
};
