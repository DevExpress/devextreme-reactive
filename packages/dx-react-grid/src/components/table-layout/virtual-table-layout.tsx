import * as React from 'react';
import { RefHolder } from '@devexpress/dx-react-core';
import {
  getCollapsedGrid,
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

  renderRowsBlock(name, collapsedGrid, Table, Body, blockRef?, marginBottom?) {
    const {
      minWidth,
      // rowComponent: Row,
      // cellComponent: Cell,
      // blockRefsHandler = () => {},
      // rowRefsHandler = () => {},
    } = this.props;

    const tableRef = blockRef || React.createRef();

    return (
      <RefHolder
        // ref={ref => blockRefsHandler(name, ref)}
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
                  // ref={ref => rowRefsHandler(row, ref)}
                >
                  <VirtualRowLayout
                    row={row}
                    cells={cells}
                    rowComponent={rowComponent}
                    cellComponent={cellComponent}
                  />
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
      getRowHeight,
      getColumnWidth,
      headerHeight,
      bodyHeight,
      footerHeight,
      containerHeight,
      tableRef,
    } = this.props;

    // const visibleBoundaries = {
    //   columns: [[0, 7]],
    //   headerRows: [0, 0],
    //   bodyRows: [0, 0],
    //   footerRows: [0, 0],
    // }

    const getColSpan = (
      tableRow, tableColumn,
    ) => getCellColSpan!({ tableRow, tableColumn, tableColumns: columns });
    const getCollapsedGridBlock = (rows, rowsVisibleBoundary) => getCollapsedGrid({
      rows,
      columns,
      rowsVisibleBoundary,
      columnsVisibleBoundary: visibleBoundaries.columns,
      getColumnWidth,
      getRowHeight,
      getColSpan,
    });
    // console.log(headerRows)
    const collapsedHeaderGrid = getCollapsedGridBlock(headerRows || [], visibleBoundaries.headerRows);
    // debugger
    const collapsedBodyGrid = getCollapsedGridBlock(bodyRows || [], visibleBoundaries.bodyRows);
    const collapsedFooterGrid = getCollapsedGridBlock(footerRows || [], visibleBoundaries.footerRows);
    const bodyBottomMargin = Math.max(0, containerHeight - headerHeight - bodyHeight - footerHeight);
    // console.log(containerHeight, headerHeight, bodyHeight, footerHeight);
    // console.log('body grid', collapsedBodyGrid)
    return (
      <React.Fragment>
        {!!headerRows.length && this.renderRowsBlock('header', collapsedHeaderGrid, HeadTable, Head)}
        {this.renderRowsBlock('body', collapsedBodyGrid, Table, Body, tableRef, bodyBottomMargin)}
        {!!footerRows.length && this.renderRowsBlock('footer', collapsedFooterGrid, FootTable, Footer)}
      </React.Fragment>
    );
    /* tslint:enable max-line-length */
  }
}
