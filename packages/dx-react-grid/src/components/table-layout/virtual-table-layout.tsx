import * as React from 'react';
import { RefHolder } from '@devexpress/dx-react-core';
import {
  getCollapsedGrid, intervalUtil, getColumnsRenderBoundary, getColumnsVisibleBoundary,
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
      getCellColSpan,
      headTableComponent: HeadTable,
      footerTableComponent: FootTable,
      tableComponent: Table,
      headComponent: Head,
      bodyComponent: Body,
      footerComponent: Footer,
      renderRowBoundaries,
      totalRowCount,
      loadedRowsStart,
      getRowHeight,
      getColumnWidth,
      headerHeight,
      bodyHeight,
      footerHeight,
      containerHeight,
      containerWidth,
      viewportLeft,
      tableRef,
    } = this.props;

    const getColSpan = (
      tableRow, tableColumn,
    ) => getCellColSpan!({
      tableRow, tableColumn, tableColumns: columns,
    });
    const visibleColumnBoundaries = [
      getColumnsRenderBoundary(
        columns.length,
        getColumnsVisibleBoundary(
          columns, viewportLeft, containerWidth, getColumnWidth,
        )[0],
      ),
    ];
    const getCollapsedGridBlock = (rows, rowsVisibleBoundary, rowCount = rows.length, offset = 0) => getCollapsedGrid({
      rows,
      columns,
      rowsVisibleBoundary,
      columnsVisibleBoundary: visibleColumnBoundaries,
      getColumnWidth,
      getRowHeight,
      getColSpan,
      totalRowCount: rowCount,
      offset,
    });

    const adjustedInterval = intervalUtil.intersect(
      { start: renderRowBoundaries[0], end: renderRowBoundaries[1] },
      { start: loadedRowsStart, end: loadedRowsStart + bodyRows.length },
    );
    const adjustedBounds = [adjustedInterval.start, adjustedInterval.end];
    const bodyBottomMargin = Math.max(0, containerHeight - headerHeight - bodyHeight - footerHeight);

    const collapsedHeaderGrid = getCollapsedGridBlock(headerRows || [], null);
    const collapsedBodyGrid = getCollapsedGridBlock(
      bodyRows || [], adjustedBounds, totalRowCount || 1, loadedRowsStart,
    );
    const collapsedFooterGrid = getCollapsedGridBlock(footerRows || [], null);

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
