import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
import { Sizer, RefHolder } from '@devexpress/dx-react-core';
import { getCollapsedGrid } from '@devexpress/dx-grid-core';
import { ColumnGroup } from './column-group';

export class VirtualTableLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rowHeights: new Map(),
      viewportTop: 0,
      viewportLeft: 0,
      headerHeight: 0,
      bodyHeight: 0,
      footerHeight: 0,
    };

    this.rowRefs = new Map();
    this.blockRefs = new Map();
    this.registerRowRef = this.registerRowRef.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }
  componentDidMount() {
    this.storeRowHeights();
    this.storeBloksHeights();
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.headerRows !== nextProps.headerRows ||
      this.props.bodyRows !== nextProps.bodyRows
    ) {
      const { rowHeights: prevRowHeight } = this.state;
      const rowHeights = [...nextProps.headerRows, ...nextProps.bodyRows].reduce(
        (acc, row) => {
          const rowHeight = prevRowHeight.get(row.key);
          if (rowHeight !== undefined) {
            acc.set(row.key, rowHeight);
          }
          return acc;
        },
        new Map(),
      );
      this.setState({ rowHeights });
    }
  }
  componentDidUpdate() {
    this.storeRowHeights();
    this.storeBloksHeights();
  }
  getRowHeight(row) {
    const storedHeight = this.state.rowHeights.get(row.key);
    if (storedHeight !== undefined) return storedHeight;
    if (row.height) return row.height;
    return this.props.estimatedRowHeight;
  }
  storeRowHeights() {
    const rowsWithChangedHeights = Array.from(this.rowRefs.entries())
      // eslint-disable-next-line react/no-find-dom-node
      .map(([row, ref]) => [row, findDOMNode(ref)])
      .filter(([, node]) => !!node)
      .map(([row, node]) => [row, node.getBoundingClientRect().height])
      .filter(([row, height]) => height !== this.getRowHeight(row));

    if (rowsWithChangedHeights.length) {
      const { rowHeights } = this.state;
      rowsWithChangedHeights
        .forEach(([row, height]) => rowHeights.set(row.key, height));

      this.setState({
        rowHeights,
      });
    }
  }
  storeBloksHeights() {
    this.setState({
      // eslint-disable-next-line react/no-find-dom-node
      headerHeight: findDOMNode(this.blockRefs.get('header')).getBoundingClientRect().height,
      // eslint-disable-next-line react/no-find-dom-node
      bodyHeight: findDOMNode(this.blockRefs.get('body')).getBoundingClientRect().height,
      // eslint-disable-next-line react/no-find-dom-node
      footerHeight: findDOMNode(this.blockRefs.get('footer')).getBoundingClientRect().height,
    });
  }
  registerRowRef(row, ref) {
    if (ref === null) {
      this.rowRefs.delete(row);
    } else {
      this.rowRefs.set(row, ref);
    }
  }
  registerBlockRef(name, ref) {
    if (ref === null) {
      this.blockRefs.delete(name);
    } else {
      this.blockRefs.set(name, ref);
    }
  }
  updateViewport(e) {
    const node = e.target;

    // NOTE: prevent nested scroll to update viewport
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

    this.setState({
      viewportTop: node.scrollTop,
      viewportLeft: node.scrollLeft,
    });
  }
  renderRowsBlock(name, collapsedGrid, Table, Body, marginBottom) {
    const {
      minWidth,
      rowComponent: Row,
      cellComponent: Cell,
    } = this.props;

    return (
      <RefHolder
        ref={ref => this.registerBlockRef(name, ref)}
      >
        <Table
          style={{ minWidth: `${minWidth}px`, ...marginBottom ? { marginBottom: `${marginBottom}px` } : null }}
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
                  ref={ref => this.registerRowRef(row, ref)}
                >
                  <Row
                    tableRow={row}
                    style={row.height !== undefined
                      ? { height: `${row.height}px` }
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
      minColumnWidth,
      height,
      containerComponent: Container,
      headTableComponent: HeadTable,
      footTableComponent: FootTable,
      tableComponent: Table,
      headComponent: Head,
      bodyComponent: Body,
      footerComponent: Footer,
      getCellColSpan,
    } = this.props;

    return (
      <Sizer>
        {({ width }) => {
          const { headerHeight, bodyHeight, footerHeight } = this.state;
          const getColSpan = (tableRow, tableColumn) =>
            getCellColSpan({ tableRow, tableColumn, tableColumns: columns });
          const collapsedHeaderGrid = getCollapsedGrid({
            rows: headerRows,
            columns,
            top: 0,
            left: this.state.viewportLeft,
            width,
            height: headerHeight,
            getColumnWidth: column => column.width || minColumnWidth,
            getRowHeight: this.getRowHeight,
            getColSpan,
          });
          const collapsedBodyGrid = getCollapsedGrid({
            rows: bodyRows,
            columns,
            top: this.state.viewportTop,
            left: this.state.viewportLeft,
            width,
            height: height - headerHeight - footerHeight,
            getColumnWidth: column => column.width || minColumnWidth,
            getRowHeight: this.getRowHeight,
            getColSpan,
          });
          const collapsedFooterGrid = getCollapsedGrid({
            rows: footerRows,
            columns,
            top: 0,
            left: this.state.viewportLeft,
            width,
            height: footerHeight,
            getColumnWidth: column => column.width || minColumnWidth,
            getRowHeight: this.getRowHeight,
            getColSpan,
          });

          return (
            <Container
              style={{ height: `${height}px` }}
              onScroll={this.updateViewport}
            >
              {!!headerRows.length && this.renderRowsBlock('header', collapsedHeaderGrid, HeadTable, Head)}
              {this.renderRowsBlock('body', collapsedBodyGrid, Table, Body, Math.max(0, height - headerHeight - bodyHeight - footerHeight))}
              {!!footerRows.length && this.renderRowsBlock('footer', collapsedFooterGrid, FootTable, Footer)}
            </Container>
          );
        }}
      </Sizer>
    );
  }
}

VirtualTableLayout.propTypes = {
  minWidth: PropTypes.number.isRequired,
  minColumnWidth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  headerRows: PropTypes.array,
  bodyRows: PropTypes.array.isRequired,
  footerRows: PropTypes.array,
  columns: PropTypes.array.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  bodyComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func,
  footerComponent: PropTypes.func,
  tableComponent: PropTypes.func.isRequired,
  headTableComponent: PropTypes.func,
  footTableComponent: PropTypes.func,
  containerComponent: PropTypes.func.isRequired,
  estimatedRowHeight: PropTypes.number.isRequired,
  getCellColSpan: PropTypes.func.isRequired,
};

VirtualTableLayout.defaultProps = {
  headerRows: [],
  footerRows: [],
  headComponent: () => null,
  headTableComponent: () => null,
  footerComponent: () => null,
  footTableComponent: () => null,
};
