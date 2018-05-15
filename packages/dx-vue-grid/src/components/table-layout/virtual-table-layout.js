import { getCollapsedGrid } from '@devexpress/dx-grid-core';
import { DxSizer, DxRefHolder } from '@devexpress/dx-vue-core';
import { ColumnGroup } from './column-group';

export const VirtualTableLayout = {
  name: 'VirtualTableLayout',
  props: {
    minWidth: {
      type: Number,
      required: true,
    },
    minColumnWidth: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    headerRows: {
      type: Array,
      default: () => [],
    },
    bodyRows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    cellComponent: {
      type: Object,
      required: true,
    },
    rowComponent: {
      type: Object,
      required: true,
    },
    bodyComponent: {
      type: Object,
      required: true,
    },
    headComponent: {
      type: Object,
      default: () => null,
    },
    tableComponent: {
      type: Object,
      required: true,
    },
    headTableComponent: {
      type: Object,
      default: () => null,
    },
    containerComponent: {
      type: Object,
      required: true,
    },
    estimatedRowHeight: {
      type: Number,
      required: true,
    },
    getCellColSpan: {
      type: Function,
      required: true,
    },
  },
  data() {
    return ({
      rowHeights: new Map(),
      viewportTop: 0,
      viewportLeft: 0,
    });
  },
  mounted() {
    this.storeRowHeights();
  },
  updated() {
    this.storeRowHeights();
  },
  watch: {
    headerRows(headerRows) {
      const { rowHeights: prevRowHeight, bodyRows } = this;
      const rowHeights = [headerRows, bodyRows].reduce(
        (acc, row) => {
          const rowHeight = prevRowHeight.get(row.key);
          if (rowHeight !== undefined) {
            acc.set(row.key, rowHeight);
          }
          return acc;
        },
        new Map(),
      );
      this.rowHeights = rowHeights;
    },
    bodyRows(bodyRows) {
      const { rowHeights: prevRowHeight, headerRows } = this;
      const rowHeights = [headerRows, bodyRows].reduce(
        (acc, row) => {
          const rowHeight = prevRowHeight.get(row.key);
          if (rowHeight !== undefined) {
            acc.set(row.key, rowHeight);
          }
          return acc;
        },
        new Map(),
      );
      this.rowHeights = rowHeights;
    },
  },
  methods: {
    getRowHeight(row) {
      const storedHeight = this.rowHeights.get(row.key);
      if (storedHeight !== undefined) return storedHeight;
      if (row.height) return row.height;
      return this.estimatedRowHeight;
    },
    storeRowHeights() {
      const rowsWithChangedHeights = Array.from(this.$refs)
        .map(node => [{ key: node.split('-')[0], height: node.split('-')[1] }, node])
        .filter(([, node]) => !!node)
        .map(([row, node]) => [row, node.getBoundingClientRect().height])
        .filter(([row, height]) => height !== this.getRowHeight(row));

      if (rowsWithChangedHeights.length) {
        const { rowHeights } = this;
        rowsWithChangedHeights
          .forEach(([row, height]) => rowHeights.set(row.key, height));

        this.rowHeights = rowHeights;
      }
    },
    updateViewport(e) {
      const node = e.target;

      if (node !== e.currentTarget) {
        return;
      }

      // NOTE: prevent iOS to flicker in bounces
      if (node.scrollTop < 0 ||
        node.scrollLeft < 0 ||
        node.scrollLeft + node.clientWidth > node.scrollWidth ||
        node.scrollTop + node.clientHeight > node.scrollHeight) {
        return;
      }

      if (this.viewportTop !== node.scrollTop || this.viewportLeft !== node.scrollLeft) {
        this.viewportTop = node.scrollTop;
        this.viewportLeft = node.scrollLeft;
      }
    },
    renderRowsBlock(collapsedGrid, Table, Body) {
      const {
        minWidth,
        rowComponent: Row,
        cellComponent: Cell,
      } = this;

      return (
        <Table
          style={{ minWidth: `${minWidth}px` }}
          minWidth={`${minWidth}px`}
        >
          <ColumnGroup
            columns={collapsedGrid.columns}
          />
          <Body>
            {collapsedGrid.rows.map((visibleRow) => {
              const { row, cells = [] } = visibleRow;
              return (
                <DxRefHolder
                  key={row.key}
                  ref={`${row.key}-${row.height}`}
                >
                  <Row
                    tableRow={row}
                    height={row.height !== undefined ? `${row.height}px` : undefined}
                  >
                    {cells.map((cell) => {
                      const { column } = cell;
                      return (
                        <Cell
                          key={column.key}
                          tableRow={row}
                          tableColumn={column}
                          style={column.animationState}
                          colSpan={cell.colSpan}
                          width={column.width !== undefined ? `${column.width}px` : undefined}
                        />
                      );
                    })}
                  </Row>
                </DxRefHolder>
              );
            })}
          </Body>
        </Table>
      );
    },
  },
  render() {
    const {
      headerRows,
      bodyRows,
      columns,
      minColumnWidth,
      height,
      containerComponent: Container,
      headTableComponent: HeadTable,
      tableComponent: Table,
      headComponent: Head,
      bodyComponent: Body,
      getCellColSpan,
      getRowHeight,
      viewportLeft,
      viewportTop,
      updateViewport,
      renderRowsBlock,
    } = this;

    return (
      <DxSizer>
        {({ width }) => {
          const headHeight = headerRows.reduce((acc, row) => acc + getRowHeight(row), 0);
          const getColSpan = (tableRow, tableColumn) =>
            getCellColSpan({ tableRow, tableColumn, tableColumns: columns });
          const collapsedHeaderGrid = getCollapsedGrid({
            rows: headerRows,
            columns,
            top: 0,
            left: viewportLeft,
            width,
            height: headHeight,
            getColumnWidth: column => column.width || minColumnWidth,
            getRowHeight,
            getColSpan,
          });
          const collapsedBodyGrid = getCollapsedGrid({
            rows: bodyRows,
            columns,
            top: viewportTop,
            left: viewportLeft,
            width,
            height: height - headHeight,
            getColumnWidth: column => column.width || minColumnWidth,
            getRowHeight,
            getColSpan,
          });

          return (
            <Container
              style={{ height: `${height}px` }}
              onScroll={updateViewport}
            >
              {!!headerRows.length && renderRowsBlock(collapsedHeaderGrid, HeadTable, Head)}
              {renderRowsBlock(collapsedBodyGrid, Table, Body)}
            </Container>
          );
        }}
      </DxSizer>
    );
  },
};
