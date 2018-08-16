import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
import { Sizer, RefHolder } from '@devexpress/dx-react-core';
import { getCollapsedGrid } from '@devexpress/dx-grid-core';
import { ColumnGroup } from './column-group';

const AUTO_HEIGHT = 'auto';

export class VirtualTableLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rowHeights: new Map(),
      viewportTop: 0,
      viewportLeft: 0,
    };
    this.state.headerHeight = props.headerRows
      .reduce((acc, row) => acc + this.getRowHeight(row), 0);
    this.state.bodyHeight = 0;
    this.state.footerHeight = props.footerRows
      .reduce((acc, row) => acc + this.getRowHeight(row), 0);

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
    const { headerRows, bodyRows } = this.props;
    if (
      headerRows !== nextProps.headerRows
      || bodyRows !== nextProps.bodyRows
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
    const { rowHeights } = this.state;
    const { estimatedRowHeight } = this.props;
    const storedHeight = rowHeights.get(row.key);
    if (storedHeight !== undefined) return storedHeight;
    if (row.height) return row.height;
    return estimatedRowHeight;
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
    const headerHeight = this.blockRefs.get('header')
      // eslint-disable-next-line react/no-find-dom-node
      ? findDOMNode(this.blockRefs.get('header')).getBoundingClientRect().height
      : 0;

    const bodyHeight = this.blockRefs.get('body')
      // eslint-disable-next-line react/no-find-dom-node
      ? findDOMNode(this.blockRefs.get('body')).getBoundingClientRect().height
      : 0;

    const footerHeight = this.blockRefs.get('footer')
      // eslint-disable-next-line react/no-find-dom-node
      ? findDOMNode(this.blockRefs.get('footer')).getBoundingClientRect().height
      : 0;

    this.setState({
      headerHeight,
      bodyHeight,
      footerHeight,
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
    if (node.scrollTop < 0
      || node.scrollLeft < 0
      || node.scrollLeft + node.clientWidth > Math.max(node.scrollWidth, node.clientWidth)
      || node.scrollTop + node.clientHeight > Math.max(node.scrollHeight, node.clientHeight)) {
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
      height: propHeight,
      containerComponent: Container,
      headTableComponent: HeadTable,
      footerTableComponent: FootTable,
      tableComponent: Table,
      headComponent: Head,
      bodyComponent: Body,
      footerComponent: Footer,
      getCellColSpan,
    } = this.props;

    const {
      viewportLeft,
      viewportTop,
      headerHeight,
      bodyHeight,
      footerHeight,
    } = this.state;

    return (
      <Sizer
        containerComponent={Container}
        style={{
          ...(propHeight === AUTO_HEIGHT ? null : { height: `${propHeight}px` }),
        }}
        onScroll={this.updateViewport}
      >
        {({ width, height }) => {
          const getColSpan = (
            tableRow, tableColumn,
          ) => getCellColSpan({ tableRow, tableColumn, tableColumns: columns });
          const collapsedHeaderGrid = getCollapsedGrid({
            rows: headerRows,
            columns,
            top: 0,
            left: viewportLeft,
            width,
            height: headerHeight,
            getColumnWidth: column => column.width || minColumnWidth,
            getRowHeight: this.getRowHeight,
            getColSpan,
          });
          const collapsedBodyGrid = getCollapsedGrid({
            rows: bodyRows,
            columns,
            top: viewportTop,
            left: viewportLeft,
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
            left: viewportLeft,
            width,
            height: footerHeight,
            getColumnWidth: column => column.width || minColumnWidth,
            getRowHeight: this.getRowHeight,
            getColSpan,
          });

          return (
            <React.Fragment>
              {!!headerRows.length && this.renderRowsBlock('header', collapsedHeaderGrid, HeadTable, Head)}
              {this.renderRowsBlock('body', collapsedBodyGrid, Table, Body, Math.max(0, height - headerHeight - bodyHeight - footerHeight))}
              {!!footerRows.length && this.renderRowsBlock('footer', collapsedFooterGrid, FootTable, Footer)}
            </React.Fragment>
          );
        }}
      </Sizer>
    );
  }
}

VirtualTableLayout.propTypes = {
  minWidth: PropTypes.number.isRequired,
  minColumnWidth: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
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
  footerTableComponent: PropTypes.func,
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
  footerTableComponent: () => null,
};
