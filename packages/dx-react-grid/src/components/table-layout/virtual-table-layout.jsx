import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
import { Sizer, RefHolder } from '@devexpress/dx-react-core';
import { ColumnGroup } from './column-group';
import { getCollapsedGrid } from './virtual-table-utils';

export class VirtualTableLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rowHeights: new Map(),
      viewportTop: 0,
      viewportLeft: 0,
    };

    this.rowRefs = new Map();
    this.registerRowRef = this.registerRowRef.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }
  componentDidMount() {
    this.storeRowHeights();
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
  registerRowRef(row, ref) {
    if (ref === null) {
      this.rowRefs.delete(row);
    } else {
      this.rowRefs.set(row, ref);
    }
  }
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

    if (this.viewportTop !== node.scrollTop) {
      this.setState({
        viewportTop: node.scrollTop,
        viewportLeft: node.scrollLeft,
      });
    }
  }
  renderRowsBlock(collapsedGrid, Table, Body) {
    const {
      minWidth,
      rowComponent: Row,
      cellComponent: Cell,
    } = this.props;

    return (
      <Table
        style={{ minWidth: `${minWidth}px` }}
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
    );
  }
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
    } = this.props;

    return (
      <Sizer>
        {({ width }) => {
          const headHeight = headerRows.reduce((acc, row) => acc + this.getRowHeight(row), 0);
          const getColSpan = (tableRow, tableColumn) =>
            getCellColSpan({ tableRow, tableColumn, tableColumns: columns });
          const collapsedHeaderGrid = getCollapsedGrid({
            rows: headerRows,
            columns,
            top: 0,
            left: this.state.viewportLeft,
            width,
            height: headHeight,
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
            height: height - headHeight,
            getColumnWidth: column => column.width || minColumnWidth,
            getRowHeight: this.getRowHeight,
            getColSpan,
          });

          return (
            <Container
              style={{ height: `${height}px` }}
              onScroll={this.updateViewport}
            >
              {!!headerRows.length && this.renderRowsBlock(collapsedHeaderGrid, HeadTable, Head)}
              {this.renderRowsBlock(collapsedBodyGrid, Table, Body)}
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
  columns: PropTypes.array.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  bodyComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func,
  tableComponent: PropTypes.func.isRequired,
  headTableComponent: PropTypes.func,
  containerComponent: PropTypes.func.isRequired,
  estimatedRowHeight: PropTypes.number.isRequired,
  getCellColSpan: PropTypes.func.isRequired,
};

VirtualTableLayout.defaultProps = {
  headerRows: [],
  headComponent: () => null,
  headTableComponent: () => null,
};
