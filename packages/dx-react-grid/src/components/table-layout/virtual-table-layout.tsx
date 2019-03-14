import * as React from 'react';
import { RefHolder } from '@devexpress/dx-react-core';
import {
  getCollapsedGrid, intervalUtil, TABLE_STUB_TYPE,
} from '@devexpress/dx-grid-core';
import { ColumnGroup } from './column-group';
import { VirtualRowLayout } from './virtual-row-layout';
import { VirtualTableLayoutProps, VirtualTableLayoutState } from '../../types';

/* tslint:disable max-line-length */
export class VirtualTableLayout extends React.PureComponent<VirtualTableLayoutProps, VirtualTableLayoutState> {
  componentDidMount() {
    const { onUpdate } = this.props;
    onUpdate();
  }

  componentDidUpdate() {
    const { onUpdate } = this.props;
    onUpdate();
  }

  renderRowsBlock(name, collapsedGrid, Table, Body, blockRef?, marginBottom?, bodyHeight?) {
    const {
      minWidth,
      blockRefsHandler = () => {},
      rowRefsHandler = () => {},
    } = this.props;

    const tableRef = blockRef || React.createRef();

    return (
      <RefHolder
        ref={ref => blockRefsHandler(name, ref)}
      >
        <Table
          tableRef={tableRef}
          style={{
            minWidth: `${minWidth}px`,
            ...marginBottom ? { marginBottom: `${marginBottom}px` } : null,
          }}
        >
          <ColumnGroup
            columns={collapsedGrid.columns}
          />
          <Body>
            {collapsedGrid.rows.map((visibleRow) => {
              const { row, cells = [] } = visibleRow;

              return (
                <RefHolder
                  key={row.key}
                  ref={ref => rowRefsHandler(row, ref)}
                >
                  <Row
                    tableRow={row}
                    style={row.height !== undefined
                      ? { height: `${(row.height === 'auto' ? bodyHeight : row.height)}px`}
                      : undefined}
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
                        />
                      );
                    })}
                  </Row>
                </RefHolder>
              );
            })}
          </Body>
        </Table>
      </RefHolder>
    );
  }

  render() {
    const {
      headerRows,
      bodyRows,
      footerRows,
      columns,
      getCellColSpan, // ^ getter in table template
      // minColumnWidth, // table layout component [theme]
      // height: propHeight,
      headTableComponent: HeadTable,
      footerTableComponent: FootTable, // ^ VirtualTable connected props
      // containerComponent: Container,
      tableComponent: Table,
      headComponent: Head,
      bodyComponent: Body,
      footerComponent: Footer, // ^ Table component
      visibleBoundaries,//: rwb,
      totalRowCount,
      loadedRowsStart,
      getRowHeight,
      getColumnWidth,
      headerHeight,
      bodyHeight,
      footerHeight,
      containerHeight,
      tableRef,
    } = this.props;

    const getColSpan = (
      tableRow, tableColumn,
    ) => getCellColSpan!({ tableRow, tableColumn, tableColumns: columns });
    const getCollapsedGridBlock = (rows, rowsVisibleBoundary, rowCount = rows.length, offset = 0) => getCollapsedGrid({
      rows,
      columns,
      rowsVisibleBoundary,
      columnsVisibleBoundary: visibleBoundaries.columns,
      getColumnWidth,
      getRowHeight,
      getColSpan,
      totalRowCount: rowCount,
      offset,
    });
    // console.log(headerRows)
    const collapsedHeaderGrid = getCollapsedGridBlock(headerRows || [], null);// visibleBoundaries.headerRows);
    // debugger
    // console.log('get grid, rows =', loadedRowsStart, bodyRows)
    //const bRows =  Array.from({ length: loadedRowsStart }).concat(bodyRows || []);
    const bRows = bodyRows;
    // console.log('get collapsed grid', bRows, visibleBoundaries.bodyRows)
    const adjustedInterval = intervalUtil.intersect(
      { start: visibleBoundaries.bodyRows[0], end: visibleBoundaries.bodyRows[1] },
      { start: loadedRowsStart, end: loadedRowsStart + bodyRows.length },
    );
    const adjustedBounds = [adjustedInterval.start, adjustedInterval.end];

    const collapsedBodyGrid = getCollapsedGridBlock(
      bRows || [], adjustedBounds, totalRowCount, loadedRowsStart,
    );
    // console.log('render layout', collapsedBodyGrid.rows)
    // console.log('total count', totalRowCount, 'bounds', visibleBoundaries.columns, 'collapsed', collapsedBodyGrid)
    const collapsedFooterGrid = getCollapsedGridBlock(footerRows || [], null);//visibleBoundaries.footerRows);
    const bodyBottomMargin = Math.max(0, containerHeight - headerHeight - bodyHeight - footerHeight);
    // console.log(containerHeight, headerHeight, bodyHeight, footerHeight);
    // console.log('body grid', collapsedBodyGrid)
    return (
      <React.Fragment>
        {!!headerRows.length && this.renderRowsBlock('header', collapsedHeaderGrid, HeadTable, Head)}
        {this.renderRowsBlock('body', collapsedBodyGrid, Table, Body, tableRef, bodyBottomMargin, containerHeight - headerHeight)}
        {!!footerRows.length && this.renderRowsBlock('footer', collapsedFooterGrid, FootTable, Footer)}
      </React.Fragment>
    );
    /* tslint:enable max-line-length */
  }
}
